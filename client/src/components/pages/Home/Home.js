import { useSelector } from 'react-redux';
import { getAds } from '../../../redux/adsRedux';
import AdSummary from '../../features/AdSummary/AdSummary';
import SearchForm from '../../features/SearchForm/SearchForm';

const Home = () => {
  const allAds = useSelector(getAds);

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
