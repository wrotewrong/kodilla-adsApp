import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAdRequest, editAdRequest } from '../../../redux/adsRedux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getUser } from '../../../redux/userRedux';
import { validationConfig } from '../../../config';

const AddForm = (props) => {
  const { id } = useParams();
  const [title, setTitle] = useState(props.title || '');
  const [text, setText] = useState(props.text || '');
  const [location, setLocation] = useState(props.location || '');
  const [price, setPrice] = useState(props.price || '');
  const [img, setImg] = useState(props.img || null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const validateImageSize = (file) => {
    if (file && file[0]) {
      if (file[0].size <= validationConfig.IMAGE_MAX_SIZE) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (props.action === 'add') {
      dispatch(addAdRequest({ title, text, location, price, img }));
      navigate('/');
    } else if (props.action === 'edit') {
      dispatch(editAdRequest({ title, text, location, price, img }, id));
      navigate('/');
    }
  };

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  if (!user) {
    return <p>You are not authorized</p>;
  } else {
    return (
      <Form
        onSubmit={validate(handleSubmit)}
        className='col-12 col-sm-6  mx-auto'
      >
        <Form.Group controlId='formAdd'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            {...register('title', {
              required: true,
              minLength: validationConfig.TITLE_MIN_LENGTH,
              maxLength: validationConfig.TITLE_MAX_LENGTH,
            })}
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter title'
          ></Form.Control>
          {errors.title && (
            <small className='d-block form-text text-danger mt-1'>
              {`Title is required and must consist of ${validationConfig.TITLE_MIN_LENGTH} to ${validationConfig.TITLE_MAX_LENGTH} characters`}
            </small>
          )}
        </Form.Group>

        <Form.Group controlId='formAdd'>
          <Form.Label>Text</Form.Label>
          <Form.Control
            {...register('text', {
              required: true,
              minLength: validationConfig.TEXT_MIN_LENGTH,
              maxLength: validationConfig.TEXT_MAX_LENGTH,
            })}
            as='textarea'
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter text'
            style={{ height: '300px' }}
          ></Form.Control>
          {errors.text && (
            <small className='d-block form-text text-danger mt-1'>
              {`Description is required and must consist of ${validationConfig.TEXT_MIN_LENGTH} to ${validationConfig.TEXT_MAX_LENGTH} characters`}
            </small>
          )}
        </Form.Group>

        <Form.Group controlId='formAdd'>
          <Form.Label>Location</Form.Label>
          <Form.Control
            {...register('location', {
              required: true,
            })}
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='Enter location'
          ></Form.Control>
          {errors.location && (
            <small className='d-block form-text text-danger mt-1'>
              Location is required
            </small>
          )}
        </Form.Group>

        <Form.Group controlId='formAdd'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            {...register('price', {
              required: true,
            })}
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Enter price'
          ></Form.Control>
          {errors.price && (
            <small className='d-block form-text text-danger mt-1'>
              Price is required
            </small>
          )}
        </Form.Group>

        <Form.Group controlId='formAdd'>
          <Form.Label>Picture</Form.Label>
          <Form.Control
            {...register('picture', {
              validate: validateImageSize,
            })}
            {...(props.action === 'add' && {
              ...register('picture', {
                required: true,
              }),
            })}
            type='file'
            onChange={(e) => setImg(e.target.files[0])}
            accept='image/png, image/gif, image/jpeg'
          ></Form.Control>
          {errors.picture && (
            <small className='d-block form-text text-danger mt-1'>
              {`The image is required and its' size must be max ${
                validationConfig.IMAGE_MAX_SIZE / 1000000
              } MB`}
            </small>
          )}
        </Form.Group>

        <Button type='submit' className='mt-3'>
          Submit
        </Button>
      </Form>
    );
  }
};

export default AddForm;
