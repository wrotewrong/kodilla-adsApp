import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Main = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Main;
