import styles from './styles.module.css';

export function DeleteScreen({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>Are you sure you want to delete this item?</p>
        <div className={styles.buttons}>
          <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
          <button onClick={onConfirm} className={styles.confirmButton}>Delete</button>
        </div>
      </div>
    </div>
  );
}