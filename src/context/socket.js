import { io } from 'socket.io-client';

import React from 'react';

export const socket = io('https://dispatch.occtransport.org');
socket.on('connect', () => {});
export const SocketContext = React.createContext();
