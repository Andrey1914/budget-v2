import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export interface CreateReviewInput {
  rating: number;
  text: string;
  username: string;
}

export interface UpdateReviewInput {
  rating: number;
  text: string;
}

export const reviewService = {
  async getUserReviews(userId: string) {
    const db = await getDb();
    return db
      .collection("reviews")
      .find({ userId: new ObjectId(userId) })
      .toArray();
  },

  async getAllPublicReviews() {
    const db = await getDb();
    const reviews = await db.collection("reviews").find({}).toArray();

    return Promise.all(
      reviews.map(async (review) => {
        const user = await db
          .collection("users")
          .findOne({ _id: review.userId });
        return {
          ...review,
          avatar: user ? user.image : null,
        };
      }),
    );
  },

  async createReview(userId: string, input: CreateReviewInput) {
    const db = await getDb();
    const newReview = {
      userId: new ObjectId(userId),
      username: input.username,
      rating: input.rating,
      text: input.text,
      createdAt: new Date(),
    };

    const result = await db.collection("reviews").insertOne(newReview);
    return { _id: result.insertedId, ...newReview };
  },

  async updateReview(
    reviewId: string,
    userId: string,
    input: UpdateReviewInput,
  ) {
    const db = await getDb();
    const result = await db.collection("reviews").updateOne(
      { _id: new ObjectId(reviewId), userId: new ObjectId(userId) },
      {
        $set: {
          rating: input.rating,
          text: input.text,
          updatedAt: new Date(),
        },
      },
    );

    return result.matchedCount > 0;
  },

  async deleteReview(reviewId: string, userId: string) {
    const db = await getDb();
    const result = await db.collection("reviews").deleteOne({
      _id: new ObjectId(reviewId),
      userId: new ObjectId(userId),
    });

    return result.deletedCount > 0;
  },

  async getAverageRating() {
    const db = await getDb();
    const reviews = await db.collection("reviews").find({}).toArray();

    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / reviews.length;
  },
};
