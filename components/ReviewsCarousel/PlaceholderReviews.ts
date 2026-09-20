import { IClientReview } from "@/interfaces";
import womenAvatar from "../../public/placeholder-avatar.jpg";
import manAvatar from "../../public/placeholder-man.webp";

interface PlaceholderData {
  username: string;
  text: string;
}

const defaultAvatars = [
  womenAvatar.src,
  manAvatar.src,
  womenAvatar.src,
  manAvatar.src,
  womenAvatar.src,
];

const defaultRatings = [5, 4.5, 4, 5, 4];

export const getPlaceholderReviews = (
  placeholdersData: PlaceholderData[],
): IClientReview[] => {
  return placeholdersData.map((item, index) => ({
    _id: { toString: () => `placeholder-${index + 1}` },
    username: item.username,
    rating: defaultRatings[index] || 5,
    avatar: defaultAvatars[index] || womenAvatar.src,
    text: item.text,
  }));
};
