import { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchForm = () => {
  const [search, setSearch] = useState('');

  return (
    <form className='mb-4 row justify-content-end'>
      <div className='row'>
        <input
          type='text'
          id='form1'
          className='form-control'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Link to={`/ad/search/${search}`}>
        <button type='submit' className='btn btn-primary'>
          Search
        </button>
      </Link>
    </form>
  );
};

export default SearchForm;
