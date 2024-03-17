import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { socket } from '@services/socket.service';


export default function MyForm() {
  const [username, setUsername] = useState();
  const [socketID, setSocketID] = useState();
  const { register, handleSubmit } = useForm();

  const handleSendMessage = (data) => {
    console.log("🍅 data Sent", data);
    socket.emit('message', data);
  };

  const handleSetUsername = (data) => {
    window.location.search = `?u=${data.username}`;
  };

  const [messageEvents, setMessageEvents] = useState([]);
  function onMessageEvent(value) {
    setMessageEvents(previous => [...previous, value]);
  }
  function onUsernameEvent(value) {
    setSocketID(value); // FIXME: should be auto update after reconnect
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const usernameParam = urlParams.get('u');
    setUsername(usernameParam);
    document.title = `user ${usernameParam}`;
    socket.emit('setUsername', { username: usernameParam });

    socket.on('message', onMessageEvent);
    socket.on('setUsername', onUsernameEvent);
    return () => {
      socket.off('message', onMessageEvent);
      socket.off('setUsername', onUsernameEvent);
    };
  }, []);

  return (
    <>
      {!username
        ? <div className="enter-name-div">
          <h1>Enter Your Name</h1>
          <input type="text" {...register("username")} />
          <button onClick={handleSubmit(handleSetUsername)}>Start</button>
        </div>
        : <>
          <button onClick={() => setUsername()}>change username</button>
          <h1>Hi '{username}' with socket ID '{socketID}'</h1>
          <ul>
            {
              messageEvents?.map((event, index) =>
                <li key={index}>{event}</li>
              )
            }
          </ul>

          <form>
            <div className="form-input">
              <label>To: </label>
              <input type='text' {...register("to")} />
            </div>
            <div className="form-input">
              <label>Message: </label>
              <input type='text' {...register("message")} />
            </div>
            <button onClick={handleSubmit(handleSendMessage)}>Send</button>
          </form>
        </>
      }
    </>
  );
}