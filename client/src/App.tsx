import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getUsers } from './services/requests';

function App() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchData();
  }, []);

  console.log('users', users);
  return <div className="App"></div>;
}

export default App;
