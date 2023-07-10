import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItemLi, GalleryItemImg } from './ImageGalleryItem.styled';
import { Modal } from '../Modal';

export const ImageGalleryItem = ({image: {webformatURL, tags, largeImageURL}}) => {
  const [visible, setVisible] = useState(false);



  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <GalleryItemLi>
      <GalleryItemImg
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
      />
      {visible && (
        <Modal
          tags={tags}
          largeImageURL={largeImageURL}
          onCloseModal={toggleModal}
        />
      )}
    </GalleryItemLi>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
