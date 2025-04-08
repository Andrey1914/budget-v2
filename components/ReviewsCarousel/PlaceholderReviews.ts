import { IClientReview } from "@/interfaces";
import womenAvatar from "../../public/placeholder-avatar.jpg";
import manAvatar from "../../public/placeholder-man.webp";

const placeholderReviews: IClientReview[] = [
  {
    _id: { toString: () => "placeholder-1" },
    username: "Місце для твого відгуку",
    rating: 5,
    avatar: womenAvatar.src,
    text: "Розкажи нам, що ти думаєш про сервіс 💬",
  },
  {
    _id: { toString: () => "placeholder-2" },
    username: "Анонім",
    rating: 4.5,
    avatar: manAvatar.src,
    text: "Тут могла б бути твоя історія успіху ✨",
  },
  {
    _id: { toString: () => "placeholder-3" },
    username: "Новий користувач",
    rating: 4,
    avatar: womenAvatar.src,
    text: "Поділись своїм досвідом і надихни інших 🤗",
  },
  {
    _id: { toString: () => "placeholder-4" },
    username: "Місце для твого відгуку",
    rating: 5,
    avatar: manAvatar.src,
    text: "Розкажи нам, що ти думаєш про сервіс 💬",
  },
  {
    _id: { toString: () => "placeholder-5" },
    username: "Новий користувач",
    rating: 4,
    avatar: womenAvatar.src,
    text: "Поділись своїм досвідом і надихни інших 🤗",
  },
];

export default placeholderReviews;
