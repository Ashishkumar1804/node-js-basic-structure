import { Request, Response, NextFunction } from "express"
export interface AuthInterface {
    logIn(data: any, next: NextFunction): any;
    logOut(data: any): any;
    register(data: any, files: any, next: NextFunction): any;
    verifyOtp(data: any, next: NextFunction): Promise<any>
    completeProfile(userId: any, data: any, next: NextFunction): Promise<any>
}

export interface AuthControllerInterface {
    login(req: Request, res: Response, next: NextFunction): any
    logOut(req: Request, res: Response, next: NextFunction): any
    register(req: Request, res: Response, next: NextFunction): any
}