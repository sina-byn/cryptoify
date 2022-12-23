import { RefObject, useEffect } from 'react';

const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, onClickOutside: Function) => {
  const clickOutsideHandler = (e: Event) => {
    const target = e.target as HTMLElement;
    if (ref.current && !ref.current.contains(target)) onClickOutside(false);
  };

  useEffect(() => {
    window.addEventListener('click', clickOutsideHandler);

    return () => window.removeEventListener('click', clickOutsideHandler);
  }, [ref.current]);
};

export default useClickOutside;
