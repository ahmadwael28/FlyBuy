import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq=req;
        const token = this.authService.getToken();
        if(token!=null)
        {

            authReq = req.clone({ headers: req.headers.set('x-access-token',  token) });

        }
        return next.handle(authReq);
    }
}