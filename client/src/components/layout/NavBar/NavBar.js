import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/userRedux';

const NavBar = () => {
  const user = useSelector(getUser);

  return (
    <Navbar bg='primary' variant='dark' className='mt-4 mb-4 rounded'>
      <div className='container'>
        <Navbar.Brand href='/'>adsApp</Navbar.Brand>
        <Nav className='me-auto row justify-content-end'>
          <Nav.Link as={NavLink} to='/'>
            Home
          </Nav.Link>
          {!user && (
            <Nav.Link as={NavLink} to='/register'>
              Sign Up
            </Nav.Link>
          )}
          {!user && (
            <Nav.Link as={NavLink} to='/login'>
              Sign In
            </Nav.Link>
          )}
          {user && (
            <Nav.Link as={NavLink} to='/logout'>
              Log out
            </Nav.Link>
          )}
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavBar;
