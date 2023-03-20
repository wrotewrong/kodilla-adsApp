import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAdById } from '../../../redux/adsRedux';
import AdForm from '../../features/AdForm/AdForm';

const AddPage = () => {
  const { id } = useParams();
  const ad = useSelector((state) => getAdById(state, id));

  return <AdForm action='edit' {...ad}></AdForm>;
};

export default AddPage;
