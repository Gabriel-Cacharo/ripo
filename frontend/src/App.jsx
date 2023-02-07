import './assets/styles/base.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header/Header';
import Routes from './routes';

import { AuthProvider } from './context/AuthContext';

function App() {
  AOS.init({
    duration: 900,
    once: true,
  });

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <Routes />
        </div>
      </AuthProvider>

      <ToastContainer position="top-right" autoClose="5000" closeOnClick theme="dark" />
    </Router>
  );
}

export default App;
