import { useState } from 'react';
import styles from './styles.module.css';

export function Signup({ onSignup }: { onSignup: (username: string) => void }) {
  const [username, setUsername] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim()) {
      onSignup(username);
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