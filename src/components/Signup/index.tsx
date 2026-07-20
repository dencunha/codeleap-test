import { useState } from 'react';
import styles from './styles.module.css';
import { usePosts } from '../../contexts/PostContext';

export function Signup() {
  const [username, setUsername] = useState('');
  const { handleSignup } = usePosts();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim()) {
      handleSignup(username);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Welcome to CodeLeap network!</h2>
        <label>Please enter your username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="John doe"
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={!username.trim()}>
          ENTER
        </button>
      </form>
    </div>
  );
}