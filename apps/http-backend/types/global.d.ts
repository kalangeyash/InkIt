import type { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;  // 👈 your custom field
    }
  }
}