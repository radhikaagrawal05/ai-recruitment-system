import { IUserRepository } from "../../domain/repositories/IUserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export class LoginUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: LoginUserDTO): Promise<LoginResult> {
    // 1. find user
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // 2. check password
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    // 3. generate token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: (process.env.JWT_EXPIRES_IN as any) || "7d" }
    );

    return {
      token,
      user: {
        id: user.id as string,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}