import React from "react";
import { Text, Flex, Box, Button } from "@chakra-ui/react";
import { getStatusColor } from "../utils/functions";
const Route = ({ route, setSelectedRoute }) => {
	return (
		<Flex align="center" mb={2}>
			<Box
				w="1.875rem"
				h="1.875rem"
				bg={route.color}
				borderRadius="50%"
				mr={6}
				aspectRatio={1}
			/>
			<Text fontSize="1rem" fontWeight="bold" mr="auto">
				{route.name} 
			</Text>
			<Button
				backgroundColor="#fff"
				_hover={{ backgroundColor: "#fff" }}
				onClick={
					route.status === "Delays" || route.status === "Planned Detour"
						? () => setSelectedRoute(route)
						: null
				}
				textDecoration={
					route.status === "Delays" || route.status === "Planned Detour"
						? "underline " + getStatusColor(route.status)
						: null
				}
				color={getStatusColor(route.status)}
			>
				{route.status}
			</Button>
		</Flex>
	);
};

export default Route;
