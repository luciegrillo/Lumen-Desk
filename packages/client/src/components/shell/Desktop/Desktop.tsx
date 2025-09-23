import { useState, MouseEvent } from 'react';
import { Wallpaper } from '../Wallpaper/Wallpaper';
import { Taskbar, TASKBAR_POSITIONS, type TaskbarPosition } from '../Taskbar/Taskbar';
import styles from './Desktop.module.css';
import { Window } from '../../window/Window';

interface MenuState {
  visible: boolean;
  x: number;
  y: number;
}

interface WindowsState {
  isMyFirstModuleOpen: boolean;
}

export function Desktop() {
  const [background, setBackground] = useState('#2a2a2e');
  const [taskbarPosition, setTaskbarPosition] = useState<TaskbarPosition>(TASKBAR_POSITIONS.BOTTOM);
  const [menu, setMenu] = useState<MenuState>({ visible: false, x: 0, y: 0 });
  
  const [windows, setWindows] = useState<WindowsState>({ isMyFirstModuleOpen: true });

  const handleCloseWindow = (windowId: keyof WindowsState) => {
    setWindows(prev => ({ ...prev, [windowId]: false }));
  };

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setMenu({ visible: true, x: event.clientX, y: event.clientY });
  };

  const closeMenu = () => setMenu({ ...menu, visible: false });

  const handleChangeBackground = (color: string) => {
    setBackground(color);
    closeMenu();
  };
  
  const handleChangeTaskbarPosition = (position: TaskbarPosition) => {
    setTaskbarPosition(position);
    closeMenu();
  }

  return (
    <main
      className={styles.desktopContainer}
      onContextMenu={handleContextMenu}
      onClick={closeMenu}
    >
      <Wallpaper background={background} />
      
      {}
      {windows.isMyFirstModuleOpen && (
        <Window 
          title="Primeiro Módulo"
          onClose={() => handleCloseWindow('isMyFirstModuleOpen')}
        >
          <p>Olá, mundo!</p>
          <p>O requisito <strong>FR-WIN-02</strong> está em andamento.</p>
        </Window>
      )}
      
      {menu.visible && (
        <div className={styles.contextMenu} style={{ top: menu.y, left: menu.x }}>
          <ul>
            <li onClick={() => handleChangeBackground('#0d3b66')}>Set Blue BG</li>
            <li onClick={() => handleChangeBackground('#3c1874')}>Set Purple BG</li>
            <hr />
            <li onClick={() => handleChangeTaskbarPosition(TASKBAR_POSITIONS.TOP)}>Taskbar on Top</li>
            <li onClick={() => handleChangeTaskbarPosition(TASKBAR_POSITIONS.BOTTOM)}>Taskbar on Bottom</li>
          </ul>
        </div>
      )}

      <Taskbar position={taskbarPosition} />
    </main>
  );
}