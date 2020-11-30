import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

interface UseWindowResize {
  width?: number;
  height?: number;
}

export const useWindowSize = (): UseWindowResize => {
  const [windowSize, setWindowSize] = useState<UseWindowResize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 300);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
