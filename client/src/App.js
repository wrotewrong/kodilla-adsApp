import { Routes, Route } from 'react-router-dom';
import Main from './components/layout/Main/Main';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import RegisterPage from './components/pages/RegisterPage/RegisterPage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import SearchPage from './components/pages/SearchPage/SearchPage';
import SingleAdPage from './components/pages/SingleAd/SingleAdPage';
import AddPage from './components/pages/AddPage.js/AddPage';
import EditPage from './components/pages/EditPage/EditPage';
import RemovePage from './components/pages/RemovePage/RemovePage';
import LogoutPage from './components/pages/LogoutPage/LogoutPage';

function App() {
  return (
    <div className='App'>
      <Main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/logout' element={<LogoutPage />} />
          <Route path='/ad/:id' element={<SingleAdPage />} />
          <Route path='/ad/search/:searchPhrase' element={<SearchPage />} />
          <Route path='/ad/add' element={<AddPage />} />
          <Route path='/ad/edit/:id' element={<EditPage />} />
          <Route path='/ad/remove/:id' element={<RemovePage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Main>
    </div>
  );
}

export default App;
