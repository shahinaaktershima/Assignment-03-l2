import { Schema, model, connect, Date } from 'mongoose';
import bcrypt from 'bcrypt';

import { TUser,  Usermodels } from './user.Interface';
import config from '../../config';


const userSchema = new Schema<TUser,Usermodels>({
  name: {
    type: String,
    required: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});



userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (email: string) {
  return await Usermodel.findOne({ email }).select('+password');
}; 

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
// updatedate
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});
// checking isdeleted or not
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Usermodel.findOne({ id });
  return existingUser;
};
// Create and export the model
export const Usermodel = model<TUser,Usermodels>('User', userSchema);
