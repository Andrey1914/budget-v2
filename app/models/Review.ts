import { Schema, model, models } from "mongoose";
import { IReview } from "@/interfaces";

const reviewSchema = new Schema<IReview>({
  _id: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = models.Review || model<IReview>("Review", reviewSchema);

export default Review;
