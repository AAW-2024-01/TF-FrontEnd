import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService} from '../services/user.service';

@Injectable()
export class AutorizadorInterceptor implements HttpInterceptor {

  constructor (private usuarioService: UserService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.usuarioService.getToken();
    if (token) {
      let copiaRequest = req.clone({
        headers: req.headers.set("Authorization","Bearer "+token)
      });
      console.log(copiaRequest);
      return next.handle(copiaRequest);
    }
    return next.handle(req);  
  }

} 