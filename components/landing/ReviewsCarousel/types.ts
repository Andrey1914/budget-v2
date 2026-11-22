import { Session } from "next-auth";

export interface FeedbackSectionProps {
  session: Session | null;
  handleAddReview: (review: { rating: number | null; text: string }) => void;
  handleReviewClick: () => void;
}

export interface PlaceholderData {
  username: string;
  text: string;
}
