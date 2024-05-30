import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="" onClick={() => navigate('/asdf')}>
      로그인
    </div>
  );
};
export default Login;
