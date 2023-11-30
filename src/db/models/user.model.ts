import { ICreatedUpdated, IEnhancedMongooseModel } from '@/types/db';
import mongoose, { Schema, model } from 'mongoose';
import { IOrganization } from './organization.model';


export interface IUser<Organization = IOrganization> extends ICreatedUpdated {
  organization: Organization;
  info: {
    given_name: string;
    family_name: string;
    email: string;
    phone: string;
    dob: Date;
  }
  assets: {
    avatar_url: string;
  }
}

const InfoSchema = {
  given_name: String,
  family_name: String,
  email: String,
  phone: String,
  dob: Date
};

const AssetsSchema = {
  avatar_url: String,
}

export const UserSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  },
  info: InfoSchema,
  assets: AssetsSchema,
  created: {
    type: Date,
    immutable: true,
  },
  updated: Date,
});

UserSchema.pre('save', function (next) {
  // @ts-ignore
  this.created = this.created || new Date();
  // @ts-ignore
  this.updated = new Date();
  next();
});

const User = mongoose.models?.User || model<IUser>(
  'User',
  UserSchema
) as IEnhancedMongooseModel<IUser>;

export default User;