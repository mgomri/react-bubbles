import React, {useState} from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';



const Login = () => {
  const initialState = {
    username: '',
    password: ''
  }

  const history = useHistory();

  const [credentials, setCredentials] = useState(initialState);

  const onChangeHandler = e => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  };

  const login = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', credentials)
    .then(res => {
      localStorage.setItem('token', JSON.stringify(res.data.payload));
      history.push('/colors');
    })
    .catch(err => console.log(err));
  }
  return (
    <div className='login-form'>
      <NavLinks />
      <h1>Welcome to the Bubble App!</h1>
      <h3>Login to see our bubbles</h3>
      <form className='form' onSubmit={login}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          value={credentials.username}
          onChange={onChangeHandler}
        />
         <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={credentials.password}
          onChange={onChangeHandler}
        />
        <button type='submit' className='button'>Login</button>
      </form>
    </div>
  );
};

export default Login;