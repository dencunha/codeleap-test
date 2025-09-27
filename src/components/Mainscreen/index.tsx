// src/components/mainscreen/index.tsx
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { DeleteScreen } from '../Deletescreen';
import { EditScreen } from '../Editscreen';
import edit from '../../assets/edit-icon.svg'
import delet from '../../assets/delete-icon.svg'

export function MainScreen({
  currentUser,
  posts,
  onAddPost,
  onDeletePost,
  onEditPost,
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [tick, setTick] = useState(0);


  function timeAgo(createdAt) {
    const now = Date.now();
    const diffInMs = now - createdAt;
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1); 
    }, 60000); 

    return () => clearInterval(interval); 
  }, []); 

  function handleCreatePost(e) {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onAddPost(title, content);
      setTitle('');
      setContent('');
    }
  }

  function openDeleteModal(id) {
    setDeletePostId(id);
    setIsDeleteOpen(true);
  }

  function confirmDelete() {
    if (deletePostId !== null) {
      onDeletePost(deletePostId);
    }
    setIsDeleteOpen(false);
    setDeletePostId(null);
  }

  function openEditModal(post) {
    setEditPost(post);
    setIsEditOpen(true);
  }

  function handleEditSave(title, content) {
    if (editPost) {
      onEditPost(editPost.id, title, content);
    }
    setIsEditOpen(false);
    setEditPost(null);
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>CodeLeap Network</h1>
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
              <p>{timeAgo(post.createdAt)}</p>
              </div>
              <p>{post.content}</p>
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