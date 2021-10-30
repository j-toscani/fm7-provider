import { ObjectId } from "bson";
import { FindOptions, UpdateDescription } from "mongodb";
import { getCollection } from "./connectDb";

export type BaseDocument = {
  _id?: ObjectId;
};

export abstract class BaseRepo<T> {
  collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  get collection() {
    return getCollection<T>(this.collectionName);
  }
  update(query: Partial<T>, update: UpdateDescription<T>) {
    return this.collection.updateOne(query, update);
  }
  getOne(query: Partial<T>) {
    return this.collection.findOne(query);
  }
  getMany(query: Partial<T>, options?: FindOptions<T>) {
    return options
      ? this.collection.find(query, options)
      : this.collection.find(query);
  }
  create(entry: T) {
    // necessary because: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/46375
    //@ts-expect-error
    return this.collection.insertOne(entry);
  }
  delete(entry: Partial<T>) {
    return this.collection.deleteOne(entry);
  }
}
