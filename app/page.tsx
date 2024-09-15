"use client";

// import styles from "./page.module.css";
import { SessionProvider } from "next-auth/react";

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <>
//         <h1>Budget App</h1>
//       </>
//     </main>
//   );
// }
import React from "react";
// import Navbar from "@/components/Navbar";
// import { useAuth } from "@/hooks/useAuth";
// import Dashboard from "@/app/dashboard/page";

const Home: React.FC = () => {
  // const { user, logout } = useAuth();

  return (
    // <Dashboard />
    <SessionProvider>
      {/* <div> */}
      {/* <Navbar /> */}

      <main>
        {/* {user ? (
            <div>
              <h1>Welcome, {user.name}</h1>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <div>
              <h1>Please log in</h1>
            </div>
          )} */}
      </main>
      {/* </div> */}
    </SessionProvider>
  );
};

export default Home;
