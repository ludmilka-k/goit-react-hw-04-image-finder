import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItemLi, GalleryItemImg } from './ImageGalleryItem.styled';
import { Modal } from '../Modal';

export class ImageGalleryItem extends Component {
  state = {
    visible: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      visible: !prevState.visible,
    }));
  };

  render() {
    const { image: { webformatURL, tags, largeImageURL } } = this.props;
    const { visible } = this.state;
    return (
      <GalleryItemLi>
        <GalleryItemImg
          src={webformatURL}
          alt={tags}
          onClick={this.toggleModal}
        />
        {visible && (
          <Modal
            tags={tags}
            largeImageURL={largeImageURL}
            onCloseModal={this.toggleModal}
          />
        )}
      </GalleryItemLi>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
