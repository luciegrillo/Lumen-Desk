import styles from './Taskbar.module.css';

export const TASKBAR_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

type ObjectValues<T> = T[keyof T];

export type TaskbarPosition = ObjectValues<typeof TASKBAR_POSITIONS>;

interface TaskbarProps {
  position: TaskbarPosition;
}

export function Taskbar({ position }: TaskbarProps) {
  return (
    <footer className={styles.taskbar} data-position={position}>
      {/* Espaço reservado para ícones e menus futuros. */}
    </footer>
  );
}