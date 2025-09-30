import { useState } from 'react';
import styles from './styles.module.css';

export function EditScreen({ 
  initialTitle, 
  initialContent, 
  onSave, 
  onCancel }: 
  { initialTitle: string; 
    initialContent: string; 
    onSave: (title: string, content: string) => void; 
    onCancel: () => void }) 
  {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSave(title, content);
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit item</h2>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
          />
          <div className={styles.buttons}>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancel</button>
            <button type="submit" className={styles.saveButton} disabled={!title.trim() || !content.trim()}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}