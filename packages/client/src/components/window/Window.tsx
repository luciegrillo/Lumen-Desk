import React, { useState, useEffect, MouseEvent } from 'react';
import styles from './Window.module.css';
import { Minus, Square, X } from 'lucide-react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function Window({ title, children, onClose }: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 150, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: event.clientX - offset.x,
        y: event.clientY - offset.y,
      });
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset]);

  const handleMouseDown = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest(`.${styles.controls}`)) {
      return;
    }
    setIsDragging(true);
    setOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  return (
    <div
      className={styles.windowFrame}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <header
        className={styles.titleBar}
        onMouseDown={handleMouseDown}
      >
        <span className={styles.title}>{title}</span>
        <div className={styles.controls}>
          {}
          <button className={`${styles.controlButton} ${styles.minimize}`}>
            <Minus size={10} />
          </button>
          <button className={`${styles.controlButton} ${styles.maximize}`}>
            <Square size={10} />
          </button>
          <button 
            className={`${styles.controlButton} ${styles.close}`}
            onClick={onClose}
          >
            <X size={10} />
          </button>
        </div>
      </header>
      <section className={styles.windowContent}>
        {children}
      </section>
    </div>
  );
}