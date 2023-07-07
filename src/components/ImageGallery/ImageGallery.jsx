import PropTypes from 'prop-types';
import {GalleryStyled} from './ImageGallery.styled';
import {ImageGalleryItem} from '../ImageGalleryItem';

export const ImageGallery = ({images}) => {
  return (
    <GalleryStyled>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
        />
        )
      )}
    </GalleryStyled>
  )
}

ImageGallery.prototype = {
  image: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired
}
