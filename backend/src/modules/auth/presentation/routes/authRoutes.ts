import { Router, Request, Response } from "express";
import { RegisterUser } from "../../application/use-cases/RegisterUser";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";
import { registerSchema } from "../../application/validators/authValidators";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const repo = new MongoUserRepository();
    const registerUser = new RegisterUser(repo);
    const user = await registerUser.execute(parsed.data);

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;