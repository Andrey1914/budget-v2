import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export interface UpdateProfileInput {
  name: string;
  avatar: string;
  // baseCurrency?: string;
  currency?: string;
}

export const userService = {
  async getUserByEmail(email: string) {
    const db = await getDb();
    return db.collection("users").findOne({ email });
  },

  async getUserById(userId: string) {
    const db = await getDb();
    return db.collection("users").findOne({ _id: new ObjectId(userId) });
  },

  async updateProfile(
    userId: string,
    email: string,
    input: UpdateProfileInput,
  ) {
    const db = await getDb();
    const updateFields: Record<string, any> = {
      name: input.name,
      // image: input.avatar,
    };

    if (input.avatar !== undefined) {
      updateFields.image = input.avatar;
    }

    // if (input.baseCurrency) {
    //   updateFields.baseCurrency = input.baseCurrency;
    // }
    if (input.currency) {
      updateFields.currency = input.currency;
    }

    const result = await db
      .collection("users")
      .updateOne({ email }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return false;
    }

    if (result.modifiedCount > 0) {
      await db
        .collection("reviews")
        .updateMany(
          { userId: new ObjectId(userId) },
          { $set: { username: input.name } },
        );
    }

    // return result.modifiedCount > 0;
    return true;
  },

  async updateUserCurrency(email: string, currency: string) {
    const db = await getDb();
    const result = await db
      .collection("users")
      .updateOne({ email }, { $set: { currency } });

    // return result.modifiedCount > 0;
    return result.matchedCount > 0;
  },

  async deleteUserAvatar(email: string) {
    const db = await getDb();
    const result = await db
      .collection("users")
      .updateOne({ email }, { $set: { image: null } });

    // return result.modifiedCount > 0;
    return result.matchedCount > 0;
  },
};
