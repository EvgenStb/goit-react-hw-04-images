import {useState} from 'react';
import { ImSearch } from 'react-icons/im';
import './Searchbar.css';
import Notiflix from 'notiflix';


export default function SearchBar ({onSubmitQuery}) {
const [query, setQuery] = useState('')
  
const handlerInput = e => {
    setQuery(e.target.value.toLowerCase())
  }

const handlerSubmit = e => {
  e.preventDefault();
  if (query.trim()===''){
    Notiflix.Notify.failure('Please enter your search term');
    return;
  }
  onSubmitQuery(query);
  setQuery('');
}

    return (
      <header className="Searchbar">
        <form className="SearchForm"
         onSubmit={handlerSubmit}
         >
          <button type="submit" className="SearchForm-button">
            <ImSearch style={{ marginRight: 8 }} />
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            onChange={handlerInput}
            value={query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
}
