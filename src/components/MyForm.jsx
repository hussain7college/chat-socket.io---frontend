import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { socket } from '../socket';


export default function MyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState();
  const [socketID, setSocketID] = useState();
  const { register, handleSubmit } = useForm();

  const enteredUsername = (data) => {
    setUsername(data?.username);
    socket.emit('setUsername', data);
  };

  const sendMessage = (data) => {
    setIsLoading(true);
    console.log("🍅 data Sent", data);
    socket.emit('message', data);
  };


  const [messageEvents, setMessageEvents] = useState([]);
  function onMessageEvent(value) {
    setIsLoading(false);
    setMessageEvents(previous => [...previous, value]);
  }
  function onUsernameEvent(value) {
    setSocketID(value);
  }
  useEffect(() => {
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
          <button onClick={handleSubmit(enteredUsername)}>Start</button>
        </div>
        : <>
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
            {isLoading && <p>Loading...</p>}
            <button onClick={handleSubmit(sendMessage)} disabled={isLoading}>Send</button>
          </form>
        </>
      }
    </>
  );
}