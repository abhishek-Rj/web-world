import { User } from "./userInterface";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export { }