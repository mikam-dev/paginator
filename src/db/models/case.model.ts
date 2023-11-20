import { IAddress, ICreatedUpdated, IEnhancedMongooseModel } from '@/types/db';
import { Schema, model } from 'mongoose';
import Organization, { IOrganization } from './organization.model';


export interface ICase<Owner = IOrganization> extends ICreatedUpdated {
  owner: Owner;
  client: {
    given_name: string;
    family_name: string;
    email: string;
    phone: string;
    address: IAddress
  },
  incident: {
    date: Date;
    address: IAddress;
    details: string;
  },
  recovery: {
    expected: number;
    actual: number;
    received: Date;
  }
}

const AddressSchema = {
  line1: String,
  line2: String,
  city: String,
  state: String,
  zip: String,
};

const ClientSchema = {
  given_name: String,
  family_name: String,
  email: String,
  phone: String,
  address: AddressSchema,
};

const IncidentSchema = {
  date: Date,
  address: AddressSchema,
  details: String,
};

const RecoverySchema = {
  expected: Number,
  actual: Number,
  received: Date,
};

export const CaseSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  },
  client: ClientSchema,
  incident: IncidentSchema,
  recovery: RecoverySchema,
  created: {
    type: Date,
    immutable: true,
  },
  updated: Date,
});

CaseSchema.pre('save', function (next) {
  // @ts-ignore
  this.created = this.created || new Date();
  // @ts-ignore
  this.updated = new Date();
  next();
});

const Case = model<ICase>(
  'Case',
  CaseSchema
) as IEnhancedMongooseModel<ICase>;

export default Case;
