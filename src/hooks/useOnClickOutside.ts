import { RefObject, useEffect } from 'react';

// From: https://usehooks.com/useOnClickOutside/
const useOnClickOutside = <T>(ref: RefObject<HTMLElement>, handler: (e: MouseEvent | TouchEvent) => void, dependencies: any[] = []) => {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },

    /*
     * Add ref and handler to effect dependencies. It's worth noting that because
     * passed in handler is a new function on every render that will cause this
     * effect callback/cleanup to run every render. It's not a big deal but to
     * optimize you can wrap handler in useCallback before passing it into this
     * hook.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref, handler, ...dependencies]
  );
}

export default useOnClickOutside;
