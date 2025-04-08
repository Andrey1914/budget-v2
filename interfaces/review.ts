import { Schema, Document } from "mongoose";

export interface IReview extends Document {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  username: string;
  avatar?: string;
  rating: number;
  text: string;
  createdAt: Date;
}

export interface IClientReview {
  _id: { toString: () => string };
  username: string;
  avatar?: string;
  rating: number;
  text: string;
}

export interface ReviewFormProps {
  onAddReview: (newReview: { rating: number | null; text: string }) => void;
}

export interface ReviewListProps {
  reviews: IReview[];
  onEditReview?: (
    id: string,
    updatedData: { rating: number; text: string }
  ) => void;
  onDeleteReview?: (id: string) => void;
}
