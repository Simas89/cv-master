import { useState, useEffect, useRef, useCallback } from 'react';

const useDragItem = (maxDelta: number, callback: () => void) => {
  const [dragDelta, setDragDelta] = useState(0);
  const initX = useRef(0);
  const initY = useRef(0);

  useEffect(() => {
    if (dragDelta > maxDelta) {
      removeListeners();
      callback();
    }
  }, [dragDelta]);

  const addUpListener = useCallback(() => {
    window.addEventListener('mouseup', removeListeners);
  }, []);

  const addMoveListener = useCallback(() => {
    window.addEventListener('mousemove', trackPosition);
  }, []);

  const removeUpListener = useCallback(() => {
    window.removeEventListener('mouseup', removeListeners);
  }, []);

  const removeMoveListener = useCallback(() => {
    window.removeEventListener('mousemove', trackPosition);
  }, []);

  const trackPosition = (e: MouseEvent) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    const deltaX = Math.abs(clientX - initX.current);
    const deltaY = Math.abs(clientY - initY.current);

    if (deltaX > deltaY) setDragDelta(deltaX);
    if (deltaY > deltaX) setDragDelta(deltaY);
  };

  const removeListeners = () => {
    removeUpListener();
    removeMoveListener();
    setDragDelta(0);
  };

  const initMouse = (e: MouseEvent) => {
    initX.current = e.clientX;
    initY.current = e.clientY;
    setDragDelta(1);
    addUpListener();
    addMoveListener();
  };

  useEffect(() => {
    return () => removeListeners();
  }, []);

  return { initMouse, isDrag: Boolean(dragDelta) };
};

export default useDragItem;
