import React, { Component } from 'react';
import Notiflix from 'notiflix';
import {fetchImages} from '../../services'
import {Searchbar} from '../Searchbar';
import {ImageGallery} from '../ImageGallery';
import {ButtonLoadMore} from '../Button';
import {Loader} from '../Loader';
import {Container} from "./App.styled"

export class App extends Component {
  state = {
    images: [],
    searchValue: '',
    totalImages: 0,
    isLoading: false,
    currentPage: 1,
    total: 0,
  };

  handleImagesFromApi = async() => {
    try {
      this.setState({ isLoading: true });
      const { searchValue, currentPage } = this.state;
      const { images, totalImages } = await fetchImages(searchValue, currentPage);
      if (images.length && currentPage === 1) {
        Notiflix.Notify.success(`Hooray! We found ${totalImages} images.`);
      }
      if (images.length === 0) {
        Notiflix.Notify.failure('There are no images found. Please, enter a valid value');
      }
      if (this.state.images.length + images.length >= totalImages) {
        Notiflix.Notify.info('We\'re sorry, but you\'ve reached the end of search results.');
      }
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images],
          total: totalImages,
        }
      })
    } catch(error) {
      this.setState({ error: error.message })
    } finally {
      this.setState({ isLoading: false });
    }
  }
  handleSubmit = searchValue => {
    if (searchValue.trim() === '') {
      return Notiflix.info('You wrote nothing')
    } else if (this.state.searchValue !== searchValue) {
      this.setState({images: [], currentPage: 1, searchValue})
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }))
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {searchValue, currentPage} = this.state;
    if (prevState.searchValue !== searchValue ||
      prevState.currentPage !== currentPage) {
      this.handleImagesFromApi();
    }
  }

  render() {
    const {images, total, currentPage, isLoading} = this.state;
    const totalPage = Math.ceil(total / 12);
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit}/>
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {images.length > 0 && totalPage > currentPage && <ButtonLoadMore doLoadMore={this.handleLoadMore} />}
      </Container>
    )
  }
}
