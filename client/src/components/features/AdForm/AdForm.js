import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAd, editAd } from '../../../redux/adsRedux';
import { useNavigate } from 'react-router-dom';

const AddForm = (props) => {
  const [id, setId] = useState(props._id || '');
  const [title, setTitle] = useState(props.title || '');
  const [text, setText] = useState(props.text || '');
  const [location, setLocation] = useState(props.location || '');
  const [price, setPrice] = useState(props.price || '');
  const [img, setImg] = useState(props.img || null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.action === 'add') {
      dispatch(addAd({ title, text, location, price, img }));
    } else if (props.action === 'edit') {
      dispatch(editAd({ id, title, text, location, price, img }));
      navigate('/');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='col-12 col-sm-6  mx-auto'>
      <Form.Group controlId='formAdd'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter title'
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='formAdd'>
        <Form.Label>Text</Form.Label>
        <Form.Control
          as='textarea'
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Enter text'
          style={{ height: '300px' }}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='formAdd'>
        <Form.Label>Location</Form.Label>
        <Form.Control
          type='text'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder='Enter location'
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='formAdd'>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Enter price'
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='formAdd'>
        <Form.Label>Picture</Form.Label>
        <Form.Control
          type='file'
          onChange={(e) => setImg(e.target.files[0])}
        ></Form.Control>
      </Form.Group>

      <Button type='submit' className='mt-3'>
        Submit
      </Button>
    </Form>
  );
};

export default AddForm;
