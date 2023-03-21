import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/userRedux';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // null, loading, success, serverError, clientError
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        login,
        password,
      }),
      credentials: 'include',
    };

    setStatus('loading');
    fetch(`${API_URL}/auth/login`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(logIn({ login }));
          navigate('/');
        } else if (res.status === 400) {
          setStatus('clientError');
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
          <p>Login successfull</p>
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
          <Alert.Heading>Incorrect data</Alert.Heading>
          <p>Login or password are incorrect</p>
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

      <Button type='submit' className='mt-3'>
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
