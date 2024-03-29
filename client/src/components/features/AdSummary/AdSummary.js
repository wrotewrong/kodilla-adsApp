import Button from 'react-bootstrap/Button';
import { IMGS_URL } from '../../../config';
import { Link } from 'react-router-dom';

const AdSummary = ({ _id, title, img, price, location }) => {
  return (
    <>
      <div
        className='card col-12 col-sm-4 p-1 border border-primary rounded'
        style={{ height: '450px' }}
      >
        <div className='card-body overflow-hidden' style={{ height: '300px' }}>
          <img
            src={`${IMGS_URL}/${img}`}
            alt='product'
            className='card-img-top'
            style={{ height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div className='card-body'>
          <h5 className='card-title text-center'>{title}</h5>
          <div className='row justify-content-around'>
            <p className='card-text'> {location}</p>
            <p className='card-text'>Price: {price}</p>
          </div>
          <Link to={`/ad/${_id}`}>
            <Button className='col-12 card-text'>Read More</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdSummary;
