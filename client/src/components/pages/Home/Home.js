import { useDispatch, useSelector } from 'react-redux';
import { getAds, loadAdsRequest } from '../../../redux/adsRedux';
import { useEffect } from 'react';
import AdSummary from '../../features/AdSummary/AdSummary';
import SearchForm from '../../features/SearchForm/SearchForm';

const Home = () => {
  const allAds = useSelector(getAds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  return (
    <>
      <div className='container'>
        <SearchForm></SearchForm>
        <div className='row'>
          {allAds.map((ad) => {
            return <AdSummary key={ad._id} {...ad}></AdSummary>;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
