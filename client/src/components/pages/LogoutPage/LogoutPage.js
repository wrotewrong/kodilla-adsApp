import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';
import { logOut } from '../../../redux/userRedux';

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };
    fetch(`${API_URL}/auth/logout`, options).then(() => {
      dispatch(logOut());
    });
    navigate('/');
  }, [dispatch]);

  return null;
};

export default LogoutPage;
