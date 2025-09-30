import React, { useState, useEffect } from 'react';
import './global.css';
import styles from './app.module.css';
import { Signup } from './components/Signup';
import { MainScreen } from './components/Mainscreen';

export function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []); 

  function handleSignup(username) {
    setCurrentUser(username);
    localStorage.setItem('currentUser', username);
  }

  function addPost(title, content) {
    const newPost = {
      id: Date.now(),
      createdAt: Date.now(),
      title,
      content,
      user: currentUser,
      likes: 0,
    };
    setPosts([newPost, ...posts]);
  }

  function handleLogout() {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  }

  function deletePost(id) {
    setPosts(posts.filter(post => post.id !== id));
  }

  function editPost(id, title, content) {
    setPosts(posts.map(post => post.id === id ? { ...post, title, content } : post)
    );
  }

  function likePost(id) {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes === 0 ? 1 : 0 } : post
    ));
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
          onLogout={handleLogout}
          onLikePost={likePost}
        />
      ) : (
        <Signup onSignup={handleSignup} />
      )}
    </div>
  );
}