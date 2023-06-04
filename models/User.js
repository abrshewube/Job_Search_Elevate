import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import mongooseTypePhone from "mongoose-type-phone";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "lastName",
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    // Not a validator, but will check if a email already exists by creating unique index for each email
    unique: true,
    // Package for validating emails
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address",
    },
  },
  phoneNumber: {
    // Temporary solution
    type: String,
    minlength: 5,
    maxlength: 20,
    match: [/[0-9]/, "Please provide valid phone number"],
    // match: /^\d{11}$/,
    // More testing required 🗯
    // type: mongoose.SchemaTypes.Phone,
    // required: 'Phone number should be set correctly',
    // allowBlank: false,
    // allowedNumberTypes: [
    //   mongooseTypePhone.PhoneNumberType.MOBILE,
    //   mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE,
    // ],
    // phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL, // can be omitted to keep raw input
    // defaultRegion: 'DE',
    // parseOnGet: false,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    // Exclude the password from the return
    select: false,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "My city",
  },
});

// Before we save the document, run functionality
// Regular function for the this keyword scope
UserSchema.pre("save", async function () {
  // Prevent password from hashing again
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// JSON web token - _id is property on the Model
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME, // 1 day in .env
    }
  );
};

// Password from the object
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
