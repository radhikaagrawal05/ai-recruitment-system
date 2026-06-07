import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { UserRole } from "../../domain/value-objects/UserRole";
import bcrypt from "bcryptjs";

export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export class RegisterUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: RegisterUserDTO): Promise<User> {
    // 1. check duplicate
    const alreadyExists = await this.userRepository.exists(dto.email);
    if (alreadyExists) {
      throw new Error("User with this email already exists");
    }

    // 2. hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. create and save user
    const user = new User({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
    });

    return this.userRepository.save(user);
  }
}