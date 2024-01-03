import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import Route from './Route'; // Adjust the import path accordingly

const ServiceStatus = ({ routes, setSelectedRoute }) => {
  return (
    <Box
      border="1px solid #2596be"
      borderRadius="5px"
      w={['100%', '100%']}
      maxH="auto"
      minH="450px">
      <Flex
        direction="column"
        borderBottom="1px solid #2596be">
        <Text
          fontSize="1.625rem"
          fontWeight="bold"
          color="#2596be"
          p={2}>
          Bus Route Service Status
        </Text>
      </Flex>
      <Box p={4}>
        {routes.map((route) =>
          route.enabled ? (
            <Route
              key={route.name + route.id}
              setSelectedRoute={setSelectedRoute}
              route={route}
            />
          ) : null
        )}
      </Box>
    </Box>
  );
};

export default ServiceStatus;
