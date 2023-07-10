import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { ModalStyled, OverlayStyled } from './Modal.styled';

export const  Modal = ({ onCloseModal, tags, largeImageURL}) => {

  const handelOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  }

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }

  }, [onCloseModal])

  return (
    <OverlayStyled onClick={handelOverlayClick}>
      <ModalStyled>
        <img src={largeImageURL}  alt={tags} />
      </ModalStyled>
    </OverlayStyled>
  )

}

Modal.propTypes = {
  // visibleData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}
