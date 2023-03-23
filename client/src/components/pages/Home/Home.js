import { useDispatch, useSelector } from 'react-redux';
import {
  getAds,
  getRequest,
  loadAdsRequest,
  LOAD_ADS,
} from '../../../redux/adsRedux';
import { useEffect } from 'react';
import AdSummary from '../../features/AdSummary/AdSummary';
import SearchForm from '../../features/SearchForm/SearchForm';
import Spinner from 'react-bootstrap/Spinner';

const Home = () => {
  const allAds = useSelector(getAds);
  const dispatch = useDispatch();
  const request = useSelector((state) => getRequest(state, LOAD_ADS));

  console.log('home', request);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  if (!request || !request.success) {
    return (
      <Spinner
        animation='border'
        role='status'
        className='d-block mx-auto'
      ></Spinner>
    );
  } else {
    return (
      <div className='container'>
        <SearchForm></SearchForm>
        <div className='row'>
          {allAds.map((ad) => {
            return <AdSummary key={ad._id} {...ad}></AdSummary>;
          })}
        </div>
      </div>
    );
  }
};

export default Home;
