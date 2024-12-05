// "use client";

// import { useSession, getSession } from "next-auth/react";
// import { Session } from "next-auth";

// interface UpdatedSessionData {
//   name?: string;
//   avatar?: string;
// }

// const useUpdatedSession = () => {
//   const { data: currentSession } = useSession();

//   const updateSession = async (
//     newUserData: UpdatedSessionData
//   ): Promise<Session | null> => {
//     if (!currentSession?.user) {
//       console.warn("No current session available.");
//       return null;
//     }

//     const updatedSession: Session = {
//       ...currentSession,
//       user: {
//         ...currentSession.user,
//         name: newUserData.name || currentSession.user.name,
//         image: newUserData.avatar || currentSession.user.image,
//       },
//     };

//     console.log("Session updated locally:", updatedSession);

//     const refreshedSession = await getSession();

//     console.log("Refreshed session from server:", refreshedSession);

//     return refreshedSession || updatedSession;
//   };

//   return updateSession;
// };

// export default useUpdatedSession;

// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// const useUpdatedSession = () => {
//   const { data: session } = useSession();
//   const router = useRouter();

//   const updateSession = async (newUserData: {
//     name: string;
//     avatar: string;
//   }) => {
//     if (!session?.user) {
//       console.error("No session available for updating");
//       return null;
//     }

//     // Обновляем локальную сессию
//     const updatedSession = {
//       ...session,
//       user: {
//         ...session.user,
//         name: newUserData.name,
//         image: newUserData.avatar,
//       },
//     };

//     console.log("Session updated locally:", updatedSession);

//     // Принудительное обновление клиентских данных
//     router.refresh();

//     // Возвращаем обновленную локальную сессию
//     return updatedSession;
//   };

//   return updateSession;
// };

// export default useUpdatedSession;

// "use client";

// import { getSession, useSession } from "next-auth/react";

// const useUpdatedSession = () => {
//   const { data: currentSession } = useSession();

//   const updateSession = async (newUserData: {
//     name: string;
//     avatar: string;
//   }) => {
//     if (currentSession?.user) {
//       // Локальное обновление объекта сессии
//       const updatedSession = {
//         ...currentSession,
//         user: {
//           ...currentSession.user,
//           name: newUserData.name,
//           image: newUserData.avatar,
//         },
//       };

//       console.log("Session updated locally:", updatedSession);

//       // Принудительное обновление сессии через getSession
//       const refreshedSession = await getSession();
//       console.log("Refreshed session:", refreshedSession);

//       return refreshedSession || updatedSession; // Возвращаем обновленную сессию
//     }

//     return null;
//   };

//   return updateSession;
// };

// export default useUpdatedSession;

// import { useSession } from "next-auth/react";

// const useUpdatedSession = () => {
//   const { data: session, update: updateSession } = useSession();

//   const updateUserSession = async (newUserData: {
//     name: string;
//     avatar: string;
//   }) => {
//     if (!session?.user) {
//       throw new Error("No active session found.");
//     }

//     const updatedUser = {
//       ...session.user,
//       name: newUserData.name,
//       image: newUserData.avatar,
//     };

//     try {
//       // Локальное обновление сессии (React-сторона)
//       if (updateSession) {
//         await updateSession({
//           ...session,
//           user: updatedUser,
//         });
//         console.log("Session updated locally:", updatedUser);
//       }

//       return updatedUser;
//     } catch (error) {
//       console.error("Error updating session:", error);
//       throw new Error("Failed to update session.");
//     }
//   };

//   return updateUserSession;
// };

// export default useUpdatedSession;

// import { useSession, signIn } from "next-auth/react";

// // Функция для обновления сессии
// const useUpdatedSession = () => {
//   const { data: currentSession } = useSession();

//   const updateSession = async (newUserData: {
//     name: string;
//     avatar: string;
//   }) => {
//     if (currentSession && currentSession.user) {
//       try {
//         console.log("Updating session with:", {
//           email: currentSession.user.email,
//           name: newUserData.name,
//           avatar: newUserData.avatar,
//         });

//         const result = await signIn("credentials", {
//           redirect: false,
//           email: currentSession.user.email, // Используем существующий email
//           name: newUserData.name, // Новое имя пользователя
//           avatar: newUserData.avatar, // Новый аватар
//         });

//         console.log("signIn result:", result);

//         if (!result?.ok) {
//           throw new Error("Failed to update session.");
//         }

//         return true; // Возвращаем успех
//       } catch (error) {
//         console.error("Error updating session:", error);
//         return false; // Возвращаем неудачу
//       }
//     }
//     return false; // Если сессии нет
//   };

//   return { updateSession };
// };

// export default useUpdatedSession;
