import './App.css';
import React, { useEffect, useState } from 'react';
import TabContainer from './components/tab-navigator/TabContainer';
import { Outlet } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function App() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://88.200.63.148:6868', { withCredentials: true })
      .then(res => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
        }
      })
      .catch(err => {
        setAuth(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://88.200.63.148:6868/logout', { withCredentials: true });
      setAuth(false);
      setName("");
      navigate('/');
      //window.location.reload();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <TabContainer auth={auth} handleLogout={handleLogout}>
      <Outlet context={{ auth, name }} />
    </TabContainer>
  );
}

export default App;
