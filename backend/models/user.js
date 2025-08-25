import  { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    image: String
  },
  { timestamps: true }
);


// Prevent model overwrite error in Next.js, model gets saved in the internak memory/register
// ✅ Use existing model if it exists, otherwise create it
const User = models.User || model('User', userSchema, 'users');

export default User;
