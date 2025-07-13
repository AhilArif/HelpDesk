import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  password: { type: String,required: true },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next(); // Skip hashing if the password hasn't been modified
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });

export default mongoose.model("User", userSchema);
