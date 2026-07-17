import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { DeleteScreen } from '../Deletescreen';
import { EditScreen } from '../Editscreen';
import edit from '../../assets/edit-icon.svg'
import delet from '../../assets/delete-icon.svg'
import type { Post } from '../../App'


interface MainScreenProps {
 currentUser: string | null;
 posts: Post[];
 onAddPost: (title: string, content: string) => void;
 onDeletePost: (id: number) => void;
 onEditPost: (id: number, title: string, content: string) => void;
 onLogout: () => void;
 onLikePost: (id: number) => void;
}


interface LikeIconProps {
 isLiked: boolean;
 className?: string;
}


function timeAgo(dateInMs: number): string {
 const now = Date.now();
 const diffInMs = now - dateInMs;
 const diffInMinutes = Math.floor(diffInMs / 60000);


 if (diffInMinutes < 1) {
   return 'now';
 } else if (diffInMinutes < 60) {
   return `${diffInMinutes} minutes ago`;
 } else {
   const diffInHours = Math.floor(diffInMinutes / 60);
   return `${diffInHours} hours ago`;
 }
}


function LikeIcon({ isLiked, className }: LikeIconProps) {
 return (
   <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 512 512">
     <path
       d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
       fill={isLiked ? '#ff5151' : 'none'}
       stroke="currentColor"
       strokeLinecap="round"
       strokeLinejoin="round"
       strokeWidth="32"
     />
   </svg>
 );
}


function PostTime({ createdAt }: { createdAt: number }) {
 const [, setTick] = useState(0);


 useEffect(() => {
   const interval = setInterval(() => {
     setTick((prev) => prev + 1);
   }, 60000);


   return () => clearInterval(interval);
 }, []);


 return <p>{timeAgo(createdAt)}</p>;
}


function useMainScreenLogic(props: MainScreenProps) {
 const [title, setTitle] = useState<string>('');
 const [content, setContent] = useState<string>('');
 const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
 const [deletePostId, setDeletePostId] = useState<number | null>(null);
 const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
 const [editPost, setEditPost] = useState<Post | null>(null);


 function handleCreatePost(e: React.FormEvent) {
   e.preventDefault();
   if (title.trim() && content.trim()) {
     props.onAddPost(title, content);
     setTitle('');
     setContent('');
   }
 }


 function openDeleteModal(id: number) {
   setDeletePostId(id);
   setIsDeleteOpen(true);
 }


 function confirmDelete() {
   if (deletePostId !== null) {
     props.onDeletePost(deletePostId);
   }
   setIsDeleteOpen(false);
   setDeletePostId(null);
 }


 function openEditModal(post: Post) {
   setEditPost(post);
   setIsEditOpen(true);
 }


 function handleEditSave(title: string, content: string) {
   if (editPost) {
     props.onEditPost(editPost.id, title, content);
   }
   setIsEditOpen(false);
   setEditPost(null);
 }


 return {
   title, setTitle,
   content, setContent,
   isDeleteOpen, setIsDeleteOpen,
   isEditOpen, setIsEditOpen,
   editPost,
   handleCreatePost,
   openDeleteModal,
   confirmDelete,
   openEditModal,
   handleEditSave
 };
}


export function MainScreen(props: MainScreenProps) {
 const { currentUser, posts, onLogout, onLikePost } = props;


 const {
   title, setTitle,
   content, setContent,
   isDeleteOpen, setIsDeleteOpen,
   isEditOpen, setIsEditOpen,
   editPost,
   handleCreatePost,
   openDeleteModal,
   confirmDelete,
   openEditModal,
   handleEditSave
 } = useMainScreenLogic(props);


 return (
   <div className={styles.container}>
     <header>
       <h1>CodeLeap Network</h1>
       <button onClick={onLogout} className={styles.logoutButton}>Logout</button>
     </header>
     <form className={styles.form} onSubmit={handleCreatePost}>
       <h1>What's on your mind?</h1>
      
         <label>Title</label>
         <input
           type="text"
           value={title}
           onChange={(e) => setTitle(e.target.value)}
           placeholder="Hello world"
           className={styles.input}
         />
         <label>Content</label>
         <textarea
           value={content}
           onChange={(e) => setContent(e.target.value)}
           placeholder="Content here"
           className={styles.textarea}
         />
       <button type="submit" className={styles.button} disabled={!title.trim() || !content.trim()}>
         Create
       </button>
     </form>
     <div className={styles.postsList}>
       {posts.map(post => (
         <div key={post.id} className={styles.post}>
           <div className={styles.postHeader}>
             <h2>{post.title}</h2>
             {post.user === currentUser && (
               <div className={styles.actions}>
                 <button onClick={() => openEditModal(post)} className={styles.editButton}>
                   <img src={edit} alt="edit" />
                 </button>
                 <button onClick={() => openDeleteModal(post.id)} className={styles.deleteButton}>
                   <img src={delet} alt="delet" />
                 </button>
               </div>
             )}
           </div>
           <div className={styles.postContent}>
             <div className={styles.postUser}>
               <p> @{post.user}</p>
               <PostTime createdAt={post.createdAt} />
             </div>
             <p className={styles.whiteSpace}>{post.content}</p>
             <button onClick={() => onLikePost(post.id)} className={styles.likeButton}>
               <LikeIcon
                 isLiked={post.likes > 0}
                 className={styles.likeIcon}
               />
               <p>{post.likes}</p>
             </button>
           </div>
         </div>
       ))}
     </div>
     {isDeleteOpen && (
       <DeleteScreen
         onConfirm={confirmDelete}
         onCancel={() => setIsDeleteOpen(false)}
       />
     )}
     {isEditOpen && editPost && (
       <EditScreen
         initialTitle={editPost.title}
         initialContent={editPost.content}
         onSave={handleEditSave}
         onCancel={() => setIsEditOpen(false)}
       />
     )}
   </div>
 );
}
