import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { onInfoNotification } from 'Services/Notification';
import { IoSearchSharp } from 'react-icons/io5';
import {
  SearchbarBox,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';

export const SearchBar = ({onSubmit}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = e => {
   setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      onInfoNotification();
      return;
    } 

    onSubmit(searchQuery);
    setSearchQuery('');
  };

    return (
      <SearchbarBox as="header">
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit"> <IoSearchSharp />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </SearchForm>
      </SearchbarBox>
    );
  }


SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
