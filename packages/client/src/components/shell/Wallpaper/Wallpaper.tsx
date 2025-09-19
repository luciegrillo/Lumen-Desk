import styles from './Wallpaper.module.css';

interface WallpaperProps {
  background: string;
}

export function Wallpaper({ background }: WallpaperProps) {
  return (
    <div
      className={styles.wallpaper}
      style={{ backgroundColor: background }}
      data-testid="wallpaper"
    >
    </div>
  );
}