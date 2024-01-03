import React, { useEffect, useState, useContext } from 'react';
import { Flex } from '@chakra-ui/react';
import ServiceStatus from './components/ServiceStatus';
import './App.css';
import axios from 'axios';
import LineStatus from './components/LineStatus';
import { SocketContext } from './context/socket';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem('messenger-token');
  config.headers['x-access-token'] = token;

  return config;
});

function App() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const socket = useContext(SocketContext);

  const fetchRoutes = async () => {
    try {
      const { data } = await axios.get('/api/service-updates');

      setRoutes(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRoutes();

    // Listen for update events
  }, []);

  useEffect(() => {
    // Connect to the Socket.IO server when the component mounts

    // Clean up when the component unmounts
    socket.on('update', () => {
      fetchRoutes();
    });
    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off('update');
    };
  }, []);

  return (
    <Flex
      direction="column"
      bg="white"
      justify="space-between"
      align="start"
      width="100%" // Full width
    >
      {selectedRoute ? (
        <LineStatus
          route={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />
      ) : (
        <ServiceStatus
          routes={routes}
          setSelectedRoute={setSelectedRoute}
        />
      )}
    </Flex>
  );
}

export default App;
