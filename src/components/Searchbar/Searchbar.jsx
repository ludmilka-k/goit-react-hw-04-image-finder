import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSistrix } from "react-icons/fa";
import {iconSize} from '../../constans';
import {SearchbarStyled,SearchForm,SearchFormButton, SearchFormInput} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');


  const handleInputChange = event => {
    setSearchQuery(event.target.value.trim().toLowerCase())
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery) {
      onSubmit(searchQuery);
      resetForm();
    }
  };

  const resetForm = () => {
    setSearchQuery('');
  };

  return (
    <SearchbarStyled>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit" >
          <FaSistrix size={iconSize.sm}/>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </SearchForm>
    </SearchbarStyled>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
