import { useState, useEffect } from 'react';
import './global.css';
import styles from './app.module.css';
import { Signup } from './components/Signup';
import { MainScreen } from './components/Mainscreen';

export interface Post {
  id: number;
  createdAt: number;
  title: string;
  content: string;
  user: string;
  likes: number;
}

export function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser !== null) { 
      setCurrentUser(savedUser); 
    }
  }, []); 

  function handleSignup(username: string) {
    setCurrentUser(username);
    localStorage.setItem('currentUser', username);
  }

  function addPost(title: string, content: string) {
    const newPost:  Post = {
      id: Date.now(),
      createdAt: Date.now(),
      title,
      content,
      user: currentUser!,
      likes: 0,
    };
    setPosts([newPost, ...posts]);
  }

  function handleLogout() {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  }

  function deletePost(id: number) {
    setPosts(posts.filter(post => post.id !== id));
  }

  function editPost(id: number, title: string, content: string) {
    setPosts(posts.map(post => post.id === id ? { ...post, title, content } : post)
    );
  }

  function likePost(id: number) {
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