import { signOut } from "next-auth/react";
import { useEffect } from "react";

const useIdleLogout = (timeout = 20 * 60 * 1000) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        signOut();
      }, timeout);
    };

    const events = [
      "mousemove",
      "keydown",
      "mousedown",
      "touchstart",
      "input",
      "scroll",
      "wheel",
      "resize",
      "focus",
      "touchmove",
      "pointermove",
    ];

    // events.forEach((event) => window.addEventListener(event, resetTimer));
    events.forEach((event) => document.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      // events.forEach((event) => window.removeEventListener(event, resetTimer));
      events.forEach((event) =>
        document.removeEventListener(event, resetTimer)
      );

      clearTimeout(timeoutId);
    };
  }, [timeout]);
};

export default useIdleLogout;
