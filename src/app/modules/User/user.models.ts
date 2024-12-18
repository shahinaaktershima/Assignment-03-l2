import { Schema, model, connect, Date } from 'mongoose';
import { any } from 'zod';
import { TUser } from './user.Interface';
const mongoose = require('mongoose');

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
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

// Update the `updatedAt` field before saving any changes
// userSchema.pre('save', function(next:Function) {
//     const user=this  ;
//   next();
// });

// Create and export the model
export const Usermodel = model<TUser>('User', userSchema);
