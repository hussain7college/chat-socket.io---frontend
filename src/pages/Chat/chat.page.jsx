import { useEffect, useState } from 'react';
import { socket } from '@services/socket.service';
import MyFrom from '@components/MyForm';

const HomePage = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <>
      <button onClick={() => socket.connect()}>Connect</button>
      <button onClick={() => socket.disconnect()}>Disconnect</button>
      <p>State: {<span style={{ color: isConnected ? "green" : "red" }}>{'' + isConnected}</span>}</p>

      <MyFrom />
    </>
  );
};

export default HomePage;