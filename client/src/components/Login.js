import React, {useState} from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';




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
      <h1 className='title is-3'>Welcome to the Bubble App!</h1>
      <h3 className='title is-3'>Login to see our bubbles</h3>
      <div className='spacer' />
      <form className='form' onSubmit={login}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          value={credentials.username}
          onChange={onChangeHandler}
          className='input'
        />
         <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={credentials.password}
          onChange={onChangeHandler}
          className='input'
        />
        <button type='submit' className='button is-dark is-outlined is-medium'>Login</button>
      </form>
    </div>
  );
};

export default Login;