import './assets/styles/base.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

          <ToastContainer position="top-right" autoClose={5000} closeOnClick theme="dark" />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
