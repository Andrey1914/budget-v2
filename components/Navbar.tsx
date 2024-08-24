"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <nav>
      <div>
        <div>
          {status === "authenticated" ? (
            <>
              <Link href="/dashboard/income">Incomes</Link>
              <Link href="/dashboard/expense">Expenses</Link>
              <Link href="/dashboard/tasks">Tasks</Link>
              <h1>Welcome, {session?.user?.name}</h1>
              <button onClick={() => signOut()}>Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from "react";
// import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";

// const Navbar: React.FC = () => {
//   const { data: session, status } = useSession();

//   return (
//     <nav>
//       <div>
//         <Link href="/">
//           <p>My Finance App</p>
//         </Link>
//         <div>
//           <Link href="/dashboard/income">
//             <p>Income</p>
//           </Link>
//           <Link href="/dashboard/expense">
//             <p>Expenses</p>
//           </Link>
//           <Link href="/dashboard/tasks">
//             <p>Tasks</p>
//           </Link>
//           {status === "authenticated" ? (
//             <>
//               <span>{session?.user?.email}</span>
//               <button onClick={() => signOut()}>Sign Out</button>
//             </>
//           ) : (
//             <button onClick={() => signIn()}>Sign In</button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
