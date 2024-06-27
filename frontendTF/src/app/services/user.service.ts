import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Token } from '../models/token';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ruta_servidor = "http://localhost:8080/api";
  recurso = "users";

  constructor(private http:HttpClient) { }

  getUser(id: number) {
    return this.http.get<User>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  addUser(user: User) {
    return this.http.post<User>(this.ruta_servidor+"/"+this.recurso+"/register", user);
  }

  login(user: User) {
    this.logout();
    return this.http.post<Token>(this.ruta_servidor+"/"+this.recurso+"/login",user).pipe(
      tap((res)=> {
        localStorage.setItem('token', res.jwtToken);
        localStorage.setItem('user_id', res.id.toString());
        localStorage.setItem('authorities', res.authorities.toString());

      })
    );
  }

  getCurrentUserId(): number | null {
    let userId: string | null = localStorage.getItem('user_id');
    return userId != null ?  parseInt(userId) : null;
  }

  getCurrentToken(): string | null {
    let token: string | null = localStorage.getItem('token');
    return token != null ?  token : null;
  }

  getCurrentAuthorities(): string | null {
    let authorities: string | null = localStorage.getItem('authorities');
    return authorities != null ?  authorities : null;
  }

  logout(){
    localStorage.clear();
  }


}
