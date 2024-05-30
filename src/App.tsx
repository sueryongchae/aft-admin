import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Login} />
      </Routes>
    </>
  );
}

export default App;
