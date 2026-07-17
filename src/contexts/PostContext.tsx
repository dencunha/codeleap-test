import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

// 1. Trazemos a tipagem do Post para cá (você vai precisar apagar ela do App.tsx depois)
export interface Post {
  id: number;
  createdAt: number;
  title: string;
  content: string;
  user: string;
  likes: number;
}

// 2. Definimos tudo o que o nosso "Wi-Fi" vai transmitir para o projeto
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

// 3. Criamos o Contexto vazio (A nuvem em si)
export const PostContext = createContext<PostContextData>({} as PostContextData);

// 4. O Provider é o componente que vai abraçar o projeto e fornecer os dados
export function PostProvider({ children }: { children: ReactNode }) {
  // --- TUDO ISSO VEIO DO SEU APP.TSX ---
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
      user: currentUser!, // O '!' garante ao TS que o user não é nulo aqui
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
  // --- FIM DA LÓGICA DO APP.TSX ---

  // 5. Ele retorna a Nuvem preenchida com os estados e funções reais
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

// 6. Hook facilitador
export function usePosts() {
  return useContext(PostContext);
}