import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAd, getAdById } from '../../../redux/adsRedux';
import { IMGS_URL } from '../../../config';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const SingleAdPage = () => {
  const { id } = useParams();
  const ad = useSelector((state) => getAdById(state, id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteAd(id));
    navigate('/');
  };

  return (
    <>
      <div className='mt-5 container'>
        <div className='row mt-5'>
          <div className='col-12 col-lg-6 mt-3'>
            <img
              src={`${IMGS_URL}/${ad.img}`}
              className='img-fluid'
              alt='product'
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className='col-12 col-lg-6 mt-3'>
            <div className='row col-12 justify-content-between'>
              <h1>{ad.title}</h1>
              <h1>Price: {ad.price}</h1>
            </div>
            <p className='text-justify'>{ad.text}</p>
            <p>Location: {ad.location}</p>
            <p>Added: {ad.date}</p>
            <p className='mt-4'>Seller:</p>
            <div className='row col-12'>
              <div style={{ height: '80px', width: '80px' }}>
                <img
                  src={`${IMGS_URL}/${ad.user.avatar}`}
                  className='img-fluid rounded-circle w-100 h-100'
                  alt='avatar'
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='ml-3'>
                <p className='mb-1'>Name: {ad.user.login}</p>
                <p>Phone: {ad.user.phone}</p>
              </div>
            </div>
            <div className='col-12 mt-2 row justify-content-end'>
              <div className='mr-2'>
                <Link to={`../ad/edit/${id}`}>
                  <Button variant='outline-primary'>Edit</Button>
                </Link>
              </div>
              <div>
                <Button onClick={handleDelete} variant='outline-danger'>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleAdPage;
