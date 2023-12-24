import { useNavigate, useRouteError } from 'react-router-dom';
import LinkButton from './components/LinkButton';

function NotFound() {
  // const navigate = useNavigate();
  const errorMessage =  useRouteError()
  console.log(errorMessage);
  
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{errorMessage.data || errorMessage.message}</p>
      <LinkButton to='-1'>&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
