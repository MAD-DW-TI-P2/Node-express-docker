import userSchema from "../Schemas/auth.schema.js";
import mongoose from "mongoose";

const User = mongoose.model('User', userSchema);

export default User