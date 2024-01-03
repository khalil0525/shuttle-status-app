import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

const LineStatusItem = ({ serviceUpdate }) => {
	const getStatusColor = (status) => {
		// Replace this with your actual getStatusColor logic
		return status === "Delays" ? "red" : "green";
	};

	const options = {
		month: "2-digit",
		day: "2-digit",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
		timeZone: "America/New_York", // Set to East Coast time zone
	};

	return (
		<Box mb={4}>
			<Flex
				p={4}
				borderTop="1px solid #2596be"
				borderBottom={`1px solid ${getStatusColor(serviceUpdate.type)}`}
				color={getStatusColor(serviceUpdate.type)}
				fontWeight="bold"
			>
				{serviceUpdate.type}
			</Flex>

			<Text
				fontSize="1rem"
				pl={4}
				mt={4}
				fontWeight="500"
				whiteSpace="pre-line"
			>
				{serviceUpdate.serviceUpdateText}
			</Text>

			<Text fontSize="1rem" mt={2} pl={4} pr={4} color="#d1d1d1">
				Posted:{" "}
				{new Date(serviceUpdate.updatedAt)
					.toLocaleString("en-US", options)
					.replace(",", "")}
			</Text>

			{serviceUpdate.type === "Planned Detour" && (
				<Text fontSize="1rem" pl={4} color="#d1d1d1">
					Expiration:{" "}
					{new Date(serviceUpdate.expiration)
						.toLocaleString("en-US", options)
						.replace(",", "")}
				</Text>
			)}
		</Box>
	);
};

export default LineStatusItem;
