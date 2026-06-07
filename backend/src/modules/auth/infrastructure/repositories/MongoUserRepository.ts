import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { UserModel } from "../models/UserModel";

export class MongoUserRepository implements IUserRepository {

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email });
    if (!doc) return null;
    return new User({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      role: doc.role,
    });
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);
    if (!doc) return null;
    return new User({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      role: doc.role,
    });
  }

  async save(user: User): Promise<User> {
    const doc = await UserModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    return new User({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      role: doc.role,
    });
  }

  async exists(email: string): Promise<boolean> {
    const doc = await UserModel.findOne({ email });
    return !!doc;
  }
}