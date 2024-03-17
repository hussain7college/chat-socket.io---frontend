import HomePage from '@pages/Chat/chat.page';
import useNotifi from './hooks/useNotifi';

function App() {

  useNotifi();

  return (
    <HomePage />
  );
}

export default App;
