import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';

export interface Post {
  id: number;
  createdAt: number;
  title: string;
  content: string;
  user: string;
  likedBy: string[];
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
      likedBy: [],
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
    if (!currentUser) return;

    setPosts(posts.map(post => {
      if (post.id === id) {
        const hasLiked = post.likedBy.includes(currentUser);

        const updatedLikedBy = hasLiked
          ? post.likedBy.filter(user => user !== currentUser)
          : [...post.likedBy, currentUser]

          return {... post, likedBy: updatedLikedBy}
      }
      return post;
    }))
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