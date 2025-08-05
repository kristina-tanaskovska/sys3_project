import './App.css';
import React, { useEffect, useState } from 'react';
import TabContainer from './components/tab-navigator/TabContainer';
import { Outlet } from 'react-router';
import axios from 'axios';

function App() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');

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

  const handleLogout = () => {
    axios.get('http://88.200.63.148/logout', { withCredentials: true })
      .then(() => {
        setAuth(false);
        setName('');
      })
      .catch(err => console.log(err));
  };

  return (
    <TabContainer auth={auth} handleLogout={handleLogout}>
      <Outlet context={{ auth, name }} />
    </TabContainer>
  );
}

export default App;
