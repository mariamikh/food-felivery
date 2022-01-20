import React, { useState } from 'react';
import { loginUser, useAuthState, useAuthDispatch } from '../../Context';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAuthDispatch(); //get the dispatch method from the useDispatch custom hook
  const { loading, errorMessage } = useAuthState();
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    loginUser(dispatch, { email, password }).then((value) => {
      history.push('/');
    });
  };

  return (
    <div className="container login">
      <div className={{ width: 200 }}>
        <h5>Food Delivery Page</h5>
        {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
        <form>
          <div className={styles.loginForm}>
            <div className={styles.loginFormItem}>
              <label htmlFor="email">Username</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className={styles.loginFormItem}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-secondary "
            onClick={handleLogin}
            disabled={loading}
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
