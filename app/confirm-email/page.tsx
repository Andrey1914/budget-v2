"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ConfirmEmail: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token: string | null = searchParams?.get("token") || null;

  useEffect(() => {
    if (token) {
      fetch(`/api/confirmEmail/confirm-email?token=${token}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ошибка подтверждения почты");
          }
          return response.json();
        })
        .then((data) => {
          alert(data.message);

          router.push("/dashboard");
        })
        .catch((error) => {
          console.error(error);
          alert("Ошибка при подтверждении почты");
        });
    }
  }, [token, router]);

  return <div>Подтверждение почты...</div>;
};

export default ConfirmEmail;
