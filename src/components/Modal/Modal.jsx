import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { ModalStyled, OverlayStyled } from './Modal.styled';

export class  Modal extends Component {
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  }

  handelOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  }

  componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <OverlayStyled onClick={this.handelOverlayClick}>
        <ModalStyled>
          <img src={largeImageURL}  alt={tags} />
          {/*{JSON.stringify(this.props.visibleData, null, 2)}*/}
        </ModalStyled>
      </OverlayStyled>
    )
  }
}

Modal.propTypes = {
  // visibleData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}
