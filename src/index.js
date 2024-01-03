import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SocketContext, socket } from "./context/socket";
import { ChakraProvider } from "@chakra-ui/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ChakraProvider>
		<SocketContext.Provider value={socket}>
			<App />
		</SocketContext.Provider>
	</ChakraProvider>
);
