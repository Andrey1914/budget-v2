import { signOut } from "next-auth/react";
import { useEffect } from "react";

const useIdleLogout = (timeout = 20 * 60 * 1000) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Определяем функцию сброса таймера
    const resetTimer = () => {
      clearTimeout(timeoutId); // Очищаем текущий таймер
      timeoutId = setTimeout(() => {
        signOut(); // Выход пользователя
      }, timeout); // Устанавливаем новый таймер с заданным таймаутом
    };

    // Список событий для сброса таймера
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

    // Добавляем слушатели событий
    events.forEach((event) => {
      document.addEventListener(event, resetTimer);
      window.addEventListener(event, resetTimer);
    });

    // Устанавливаем начальный таймер при монтировании компонента
    resetTimer();

    // Очищаем слушатели и таймер при размонтировании компонента
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer);
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(timeoutId);
    };
  }, [timeout]);
};

export default useIdleLogout;

// import { signOut } from "next-auth/react";
// import { useEffect } from "react";

// const useIdleLogout = (timeout = 20 * 60 * 1000) => {
//   useEffect(() => {
//     let timeoutId: NodeJS.Timeout;

//     const resetTimer = () => {
//       clearTimeout(timeoutId);

//       timeoutId = setTimeout(() => {
//         signOut();
//       }, timeout);
//     };

//     const events = [
//       "mousemove",
//       "keydown",
//       "mousedown",
//       "touchstart",
//       "input",
//       "scroll",
//       "wheel",
//       "resize",
//       "focus",
//       "touchmove",
//       "pointermove",
//     ];

//     // events.forEach((event) => window.addEventListener(event, resetTimer));
//     events.forEach((event) => document.addEventListener(event, resetTimer));

//     resetTimer();

//     return () => {
//       // events.forEach((event) => window.removeEventListener(event, resetTimer));
//       events.forEach((event) =>
//         document.removeEventListener(event, resetTimer)
//       );

//       clearTimeout(timeoutId);
//     };
//   }, [timeout]);
// };

// export default useIdleLogout;
