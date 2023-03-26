import AdSummary from '../../features/AdSummary/AdSummary';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAdsByPhrase,
  loadAdsRequest,
  LOAD_ADS,
  getRequest,
} from '../../../redux/adsRedux';
import SearchForm from '../../features/SearchForm/SearchForm';
import { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const SearchPage = () => {
  const { searchPhrase } = useParams();
  const dispatch = useDispatch();
  const search = useSelector((state) => getAdsByPhrase(state, searchPhrase));
  const request = useSelector((state) => getRequest(state, LOAD_ADS));

  useEffect(() => {
    dispatch(loadAdsRequest(null, searchPhrase));
  }, [dispatch, searchPhrase]);

  if (!request || !request.success) {
    return (
      <Spinner
        animation='border'
        role='status'
        className='d-block mx-auto'
      ></Spinner>
    );
  } else if (search.length === 0) {
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
