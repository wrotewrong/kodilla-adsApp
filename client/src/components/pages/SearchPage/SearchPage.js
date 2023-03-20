import AdSummary from '../../features/AdSummary/AdSummary';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getAdsByPhrase } from '../../../redux/adsRedux';
import SearchForm from '../../features/SearchForm/SearchForm';

const SearchPage = () => {
  const { searchPhrase } = useParams();
  const search = useSelector((state) => getAdsByPhrase(state, searchPhrase));

  if (search.length === 0) {
    return <p>No match...</p>;
  } else {
    return (
      <>
        <div className='container'>
          <SearchForm></SearchForm>
          <div className='row'>
            {search.map((ad) => {
              return <AdSummary key={ad._id} {...ad}></AdSummary>;
            })}
          </div>
        </div>
      </>
    );
  }
};

export default SearchPage;
