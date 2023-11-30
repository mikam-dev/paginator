import { IAddress, ICreatedUpdated, IEnhancedMongooseModel } from '@/types/db';
import mongoose, { Schema, model } from 'mongoose';


export interface IOrganization<Member = string> extends ICreatedUpdated {
  name: string;
  location: IAddress;
  members: Member[];
}

const AddressSchema = {
  line1: String,
  line2: String,
  city: String,
  state: String,
  zip: String,
};

export const OrganizationSchema = new Schema({
  name: String,
  location: AddressSchema,
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  created: {
    type: Date,
    immutable: true,
  },
  updated: Date,
});

OrganizationSchema.pre('save', function (next) {
  // @ts-ignore
  this.created = this.created || new Date();
  // @ts-ignore
  this.updated = new Date();
  next();
});

const Organization = mongoose.models?.Organization || model<IOrganization>(
  'Organization',
  OrganizationSchema
) as IEnhancedMongooseModel<IOrganization>;

export default Organization;