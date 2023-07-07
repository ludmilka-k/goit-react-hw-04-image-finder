import PropTypes from 'prop-types';
import {ButtonStyled} from './Button.styled';

export const ButtonLoadMore = ({ doLoadMore })=> {
  return(
    <ButtonStyled
      type="button"
      onClick={() => {
        doLoadMore();
      }}
    >
      Load More
    </ButtonStyled>
  )
}

ButtonStyled.prototype = {
  loadMore: PropTypes.func.isRequired,
}
