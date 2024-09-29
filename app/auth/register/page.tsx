"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SnackbarNotification from "@/components/Notification/Snackbar";

import { Box, TextField, Button, Container } from "@mui/material";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSnackbarMessage("Registration succeeded! Please verify your email.");
        setSnackbarSeverity("success");
        setShowSnackbar(true);

        setTimeout(() => {
          router.push(`/auth/verify-email?email=${email}`);
        }, 1500);
      } else {
        setError(data.message || "Failed to create profile");
        setSnackbarMessage(data.message || "Failed to create profile");
        setSnackbarSeverity("error");
        setShowSnackbar(true);
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong");
      setSnackbarMessage("Something went wrong");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="section">
      <Container maxWidth="sm">
        <h1>Register</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        {showSnackbar && (
          <SnackbarNotification
            message={snackbarMessage}
            severity={snackbarSeverity}
          />
        )}
      </Container>
    </Box>
  );
};

export default Register;

//  ------- рабочий код ------
// "use client";

// import React, { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import SnackbarNotification from "@/components/Notification/Snackbar";

// import { Box, TextField, Button, Container } from "@mui/material";

// const Register: React.FC = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   const [showSnackbar, setShowSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
//     "success"
//   );

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         const loginRes = await signIn("credentials", {
//           redirect: false,
//           email,
//           password,
//         });

//         if (loginRes?.error) {
//           setError("Registration succeeded, but login failed.");
//           setSnackbarMessage("Registration succeeded, but login failed.");
//           setSnackbarSeverity("error");
//           setShowSnackbar(true);
//         } else {
//           setSnackbarMessage("Profile created and logged in successfully!");
//           setSnackbarSeverity("success");
//           setShowSnackbar(true);

//           setTimeout(() => {
//             // router.push("/dashboard");
//             router.push("/auth/verify-email");
//           }, 1500);
//         }
//       } else {
//         setError(data.message || "Failed to create profile");

//         setSnackbarMessage(data.message || "Failed to create profile");
//         setSnackbarSeverity("error");
//         setShowSnackbar(true);

//         setLoading(false);
//       }
//     } catch (error: any) {
//       setError(error.message || "Something went wrong");

//       setSnackbarMessage("Something went wrong");
//       setSnackbarSeverity("error");
//       setShowSnackbar(true);
//     }
//   };

//   return (
//     <Box component="section">
//       <Container maxWidth="sm">
//         <h1>Register</h1>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <Box mb={2}>
//             <TextField
//               label="Name"
//               variant="outlined"
//               fullWidth
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </Box>
//           <Box mb={2}>
//             <TextField
//               label="Email"
//               variant="outlined"
//               fullWidth
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </Box>
//           <Box mb={2}>
//             <TextField
//               label="Password"
//               type="password"
//               variant="outlined"
//               fullWidth
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </Box>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading}
//           >
//             {loading ? "Registering..." : "Register"}
//             {/* Register */}
//           </Button>
//         </form>

//         {showSnackbar && (
//           <SnackbarNotification
//             message={snackbarMessage}
//             severity={snackbarSeverity}
//           />
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default Register;
