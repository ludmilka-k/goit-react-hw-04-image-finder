import { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSistrix } from "react-icons/fa";
import {iconSize} from '../../constans';
import {SearchbarStyled,SearchForm,SearchFormButton, SearchFormInput} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  }

  handleInputChange = event => {
    this.setState({
      searchQuery: event.target.value.trim().toLowerCase(),
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    const searchQuery = this.state.searchQuery;
    if (searchQuery) {
      // this.props.onSubmit(value);
      this.props.onSubmit(searchQuery);
      this.resetForm()
    }
  };

  resetForm = () => {
    this.setState({
      searchQuery: '',
    });
  };


  render() {
    return (
      <SearchbarStyled>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" >
            <FaSistrix size={iconSize.sm}/>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </SearchbarStyled>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
