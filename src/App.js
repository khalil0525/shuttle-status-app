import React, { useEffect, useState, useContext } from 'react';
import { Flex, Box, Text, VStack } from '@chakra-ui/react';
import ServiceStatus from './components/ServiceStatus';
import LineStatus from './components/LineStatus';
import { SocketContext } from './context/socket';
import axios from 'axios';
import './App.css';

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
    socket.on('update', () => {
      fetchRoutes();
    });
    return () => {
      socket.off('update');
    };
  }, []);

  return (
    <VStack
      spacing={0}
      align="stretch"
      minHeight="100vh">
      {/* Header */}
      <Box
        p={4}
        bg="blue.500">
        <Text
          fontSize="xl"
          color="white"
          textAlign="center">
          Passenger Service Status
        </Text>
      </Box>

      {/* Main Content */}
      <Flex
        direction="column"
        p={4}
        flex="1"
        maxW={['80%']}
        margin="0 auto"
        justify="center"
        align="center">
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

      {/* Footer */}
      <Box
        p={4}
        bg="blue.500">
        <Text
          color="white"
          textAlign="center">
          © [Insert]. All rights reserved.
        </Text>
      </Box>
    </VStack>
  );
}

export default App;
