import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAdRequest,
  getAdById,
  loadAdByIdRequest,
  LOAD_AD_BY_ID,
  getRequest,
} from '../../../redux/adsRedux';
import { IMGS_URL } from '../../../config';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { getUser } from '../../../redux/userRedux';
import { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const SingleAdPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ad = useSelector((state) => getAdById(state, id));
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const request = useSelector((state) => getRequest(state, LOAD_AD_BY_ID));

  const handleDelete = () => {
    dispatch(deleteAdRequest(id));
    navigate('/');
  };

  useEffect(() => {
    dispatch(loadAdByIdRequest(id));
  }, [dispatch, id]);

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
      <>
        <div className='mt-5 container'>
          <div className='row mt-5'>
            <div className='col-12 col-lg-6 mt-3 text-center'>
              <img
                src={`${IMGS_URL}/${ad?.img}`}
                className='img-fluid'
                alt='product'
                style={{
                  height: '100%',
                  maxHeight: '600px',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className='col-12 col-lg-6 mt-3'>
              <div className='row col-12 justify-content-between'>
                <h1>{ad?.title}</h1>
                <h1>Price: {ad?.price}</h1>
              </div>
              <p className='text-justify'>{ad?.text}</p>
              <p>Location: {ad?.location}</p>
              <p>Added: {ad?.date}</p>
              <p className='mt-4'>Seller:</p>
              <div className='row col-12'>
                <div style={{ height: '80px', width: '80px' }}>
                  <img
                    src={`${IMGS_URL}/${ad?.user?.avatar}`}
                    className='img-fluid rounded-circle w-100 h-100'
                    alt='avatar'
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className='ml-3'>
                  <p className='mb-1'>Name: {ad?.user?.login}</p>
                  <p>Phone: {ad?.user?.phone}</p>
                </div>
              </div>
              <div className='col-12 mt-2 row justify-content-end'>
                <div className='mr-2'>
                  <Link to={`../ad/edit/${id}`}>
                    {user === ad?.user?.login && (
                      <Button variant='outline-primary'>Edit</Button>
                    )}
                  </Link>
                </div>
                <div>
                  {user === ad?.user?.login && (
                    <Button onClick={handleDelete} variant='outline-danger'>
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default SingleAdPage;
