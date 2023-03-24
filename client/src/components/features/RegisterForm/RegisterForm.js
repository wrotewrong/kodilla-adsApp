import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { validationConfig } from '../../../config';

const RegisterForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); // null, loading, success, serverError, clientError, loginError

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(login, password, phone, avatar);

    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('phone', phone);
    fd.append('avatar', avatar);

    const options = {
      method: 'POST',
      body: fd,
    };

    setStatus('loading');
    fetch(`${API_URL}/auth/register`, options)
      .then((res) => {
        if (res.status === 201) {
          setStatus('success');
        } else if (
          login.length < validationConfig.LOGIN_MIN_LENGTH ||
          login.length > validationConfig.LOGIN_MAX_LENGTH
        ) {
          setStatus('loginFormatError');
        } else if (
          password.length < validationConfig.PASSWORD_MIN_LENGTH ||
          password.length > validationConfig.PASSWORD_MAX_LENGTH
        ) {
          setStatus('passwordFormatError');
        } else if (
          phone.length < validationConfig.PHONE_MIN_LENGTH ||
          phone.length > validationConfig.PHONE_MAX_LENGTH
        ) {
          setStatus('phoneFormatError');
        } else if (!avatar) {
          setStatus('imageError');
        } else if (res.status === 400) {
          setStatus('clientError');
        } else if (res.status === 409) {
          setStatus('loginError');
        } else {
          setStatus('serverError');
        }
      })
      .catch((err) => {
        setStatus('serverError');
      });
  };

  return (
    <Form onSubmit={handleSubmit} className='col-12 col-sm-6  mx-auto'>
      {status === 'success' && (
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
          <p>Register successfull</p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant='danger'>
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error, try again</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant='danger'>
          <Alert.Heading>Not enough data</Alert.Heading>
          <p>You have to fill all the fields</p>
        </Alert>
      )}

      {status === 'loginFormatError' && (
        <Alert variant='danger'>
          <Alert.Heading>Wrong login format</Alert.Heading>
          <p>
            Login is required and it must consist of at least 5 and no more than
            20 characters
          </p>
        </Alert>
      )}

      {status === 'passwordFormatError' && (
        <Alert variant='danger'>
          <Alert.Heading>Wrong password format</Alert.Heading>
          <p>
            Password is required and it must consist of at least 5 and no more
            than 20 characters
          </p>
        </Alert>
      )}

      {status === 'phoneFormatError' && (
        <Alert variant='danger'>
          <Alert.Heading>Wrong phone format</Alert.Heading>
          <p>
            Phone is required and it must consist of at least 8 and no more than
            20 characters
          </p>
        </Alert>
      )}

      {status === 'imageError' && (
        <Alert variant='danger'>
          <Alert.Heading>Avatar is missing</Alert.Heading>
          <p>You have to provide an image</p>
        </Alert>
      )}

      {status === 'loginError' && (
        <Alert variant='warning'>
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to use diffrent login</p>
        </Alert>
      )}

      {status === 'loading' && (
        <Spinner
          animation='border'
          role='status'
          className='d-block mx-auto'
        ></Spinner>
      )}

      <Form.Group controlId='formLogin'>
        <Form.Label>Login</Form.Label>
        <Form.Control
          type='text'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder='Enter login'
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='formLogin'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter password'
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='formLogin'>
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type='tel'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Enter phone'
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='formLogin'>
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          type='file'
          onChange={(e) => setAvatar(e.target.files[0])}
          accept='image/png, image/gif, image/jpeg'
        ></Form.Control>
      </Form.Group>

      <Button type='submit' className='mt-3'>
        Submit
      </Button>
    </Form>
  );
};

export default RegisterForm;
