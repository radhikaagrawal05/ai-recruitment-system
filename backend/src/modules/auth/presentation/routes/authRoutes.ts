import { Router, Request, Response } from "express";
import { RegisterUser } from "../../application/use-cases/RegisterUser";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";
import { registerSchema } from "../../application/validators/authValidators";
import { LoginUser } from "../../application/use-cases/LoginUser";
import { loginSchema } from "../../application/validators/authValidators";
import { authenticate, AuthRequest } from "../../../../shared/middleware/authenticate";
import { authorize } from "../../../../shared/middleware/authorize";
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
router.post("/login", async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const repo = new MongoUserRepository();
    const loginUser = new LoginUser(repo);
    const result = await loginUser.execute(parsed.data);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
});
router.get("/me", authenticate, (req: AuthRequest, res: Response) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

// only HR can access
router.get("/hr-only", authenticate, authorize("HR"), (req: AuthRequest, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome HR!",
    user: req.user,
  });
});

// only INTERVIEWER can access
router.get("/interviewer-only", authenticate, authorize("INTERVIEWER"), (req: AuthRequest, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome Interviewer!",
    user: req.user,
  });
});

// HR and RECRUITER can access
router.get("/hr-recruiter", authenticate, authorize("HR", "RECRUITER"), (req: AuthRequest, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome HR or Recruiter!",
    user: req.user,
  });
});
export default router;