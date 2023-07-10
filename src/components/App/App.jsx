import React, { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchImages} from '../../services'
import {Searchbar} from '../Searchbar';
import {ImageGallery} from '../ImageGallery';
import {ButtonLoadMore} from '../Button';
import {Loader} from '../Loader';
import {Container} from "./App.styled"

export const App = () => {
  const [currentImages, setCurrentImages] = useState([]);
  const [searchValue, setSearchValue]  = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [total, setTotal] = useState(0);

  const handleImagesFromApi = async(searchValue, currentPage) => {
    try {
      setIsLoading( true );
      const { images, totalImages } = await fetchImages(searchValue, currentPage);
      if (images.length && currentPage === 1) {
        Notify.success(`Hooray! We found ${totalImages} images.`);
      }
      if (images.length === 0) {
        Notify.failure('There are no images found. Please, enter a valid value');
      }
      if (currentImages.length + images.length >= totalImages) {
        Notify.info('We\'re sorry, but you\'ve reached the end of search results.');
      }

      setCurrentImages(prevImages => [...prevImages, ...images]);
      const totalPages = Math.ceil(totalImages / 12);
      setTotalPages(totalPages);
    } catch(error) {
      console.log(error.message);
    } finally {
      setIsLoading(false );
    }
  }
  const handleSubmit = searchString => {
    const searchStringTrimmed = searchString.trim();
    if (searchStringTrimmed === '') {
      return Notify.info('You wrote nothing')
    } else if (searchStringTrimmed !== searchValue) {
      setCurrentImages([]);
      setCurrentPage(1);
      setSearchValue(searchStringTrimmed);
    }
  }

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1)
  }

  useEffect(() => {
    // if (searchValue === '') {
    //   return;
    // }
    if (searchValue.trim() !== '') {
      handleImagesFromApi(searchValue, currentPage);
    }
  }, [searchValue, currentPage]);

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit}/>
      {currentImages.length > 0 && <ImageGallery images={currentImages} />}
      {isLoading && <Loader />}
      {currentImages.length > 0 && totalPages > currentPage && <ButtonLoadMore doLoadMore={handleLoadMore} />}
    </Container>
  )

}
