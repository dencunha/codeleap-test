import './global.css';
import styles from './app.module.css';
import { Signup } from './components/Signup';
import { MainScreen } from './components/Mainscreen';
import { usePosts } from './contexts/PostContext';

export interface Post {
  id: number;
  createdAt: number;
  title: string;
  content: string;
  user: string;
  likes: number;
}

export function App() {
 const { currentUser } = usePosts();

 return (
    <div className={styles.app}>
      {/* 3. A MainScreen e o Signup não precisam mais receber dezenas de props! */}
      {currentUser ? (
        <MainScreen />
      ) : (
        <Signup />
      )}
    </div>
  );
}