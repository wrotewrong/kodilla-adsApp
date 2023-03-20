import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/ad/search/${search}`);
    } else {
      return;
    }
  };

  return (
    <form className='mb-4 row justify-content-end' onSubmit={handleSubmit}>
      <div className='row'>
        <input
          type='text'
          id='form1'
          className='form-control'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
