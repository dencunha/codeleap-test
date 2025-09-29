import React, { useState } from 'react';
import './global.css';
import styles from './app.module.css';
import { Signup } from './components/Signup';
import { MainScreen } from './components/Mainscreen';

export function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  function handleSignup(username) {
    setCurrentUser(username);
  }

  function addPost(title, content) {
    const newPost = {
      id: Date.now(),
      createdAt: Date.now(),
      title,
      content,
      user: currentUser,
    };
    setPosts([newPost, ...posts]);
  }

  function deletePost(id) {
    setPosts(posts.filter(post => post.id !== id));
  }

  function editPost(id, title, content) {
    setPosts(posts.map(post => post.id === id ? { ...post, title, content } : post)
    );
  }

  return (
    <div className={styles.app}>
      {currentUser ? (
        <MainScreen
          currentUser={currentUser}
          posts={posts.sort((a, b) => b.id - a.id)}
          onAddPost={addPost}
          onDeletePost={deletePost}
          onEditPost={editPost}
        />
      ) : (
        <Signup onSignup={handleSignup} />
      )}
    </div>
  );
}