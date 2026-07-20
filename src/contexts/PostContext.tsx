import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';

export interface Post {
  id: number;
  createdAt: number;
  title: string;
  content: string;
  user: string;
  likes: number;
}

interface PostContextData {
  currentUser: string | null;
  posts: Post[];
  handleSignup: (username: string) => void;
  handleLogout: () => void;
  addPost: (title: string, content: string) => void;
  deletePost: (id: number) => void;
  editPost: (id: number, title: string, content: string) => void;
  likePost: (id: number) => void;
}

export const PostContext = createContext<PostContextData>({} as PostContextData);

export function PostProvider({ children }: { children: ReactNode }) {
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

  function handleLogout() {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  }

  function addPost(title: string, content: string) {
    const newPost: Post = {
      id: Date.now(),
      createdAt: Date.now(),
      title,
      content,
      user: currentUser!,
      likes: 0,
    };
    setPosts([newPost, ...posts]);
  }

  function deletePost(id: number) {
    setPosts(posts.filter(post => post.id !== id));
  }

  function editPost(id: number, title: string, content: string) {
    setPosts(posts.map(post => post.id === id ? { ...post, title, content } : post));
  }

  function likePost(id: number) {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes === 0 ? 1 : 0 } : post
    ));
  }

  return (
    <PostContext.Provider value={{
      currentUser,
      posts,
      handleSignup,
      handleLogout,
      addPost,
      deletePost,
      editPost,
      likePost
    }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostContext);
}