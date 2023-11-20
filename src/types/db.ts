import { Document, Model } from "mongoose";

export interface ICreatedUpdated extends Document {
  created: Date;
  updated: Date;
}

export interface IEnhancedMongooseModel<T extends Document> extends Model<T> {
  findOrCreate: Function;
}

export interface IAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}