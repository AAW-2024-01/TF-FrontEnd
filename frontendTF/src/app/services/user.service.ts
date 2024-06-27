import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { tap } from 'rxjs';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  servidor:string="http://localhost:8080/api";
  recurso:string="users";

  constructor(private clienteHTTP: HttpClient) { }

  listaUsuarios(){
    return this.clienteHTTP.get<User[]>(this.servidor + "/" + this.recurso);
  }

  registrarUsuario(Usuario: User){
    return this.clienteHTTP.post<User>(this.servidor + "/" + this.recurso+"/"+"register", Usuario);
  }

  detalleUsuario(id: number){
    return this.clienteHTTP.get<User>(this.servidor +  "/"  + this.recurso +  "/" + id.toString() );
  }

  eliminarUsuario(id: number) {
    return this.clienteHTTP.delete<User>(this.servidor +  "/"  + this.recurso +  "/" + id.toString() );
  }

  logearUsuario(usuario: User){
    this.logoutUsuario();
    return this.clienteHTTP.post<Token>(this.servidor + "/" + this.recurso+"/"+"login", usuario).pipe( 
      tap((data)=>{
        localStorage.setItem("token",data.jwtToken);
        localStorage.setItem("id",data.id.toString());
        localStorage.setItem("authorities",data.authorities);
      })
    );
  }

  logoutUsuario(){
    localStorage.clear();
  }

  getId(){
    if (!(typeof localStorage === 'undefined')) {
      let idGuardado: string | null =  localStorage.getItem("id");
      return idGuardado!=null ?  parseInt(idGuardado): null;
    }
    return null;
  }

  getToken(){
    if (!(typeof localStorage === 'undefined')) {
      let tokenGuardado: string | null =  localStorage.getItem("token");
      return tokenGuardado!=null ?  (tokenGuardado): null;
    }
  return null;
  }

  getAuthorities(){
    if (!(typeof localStorage === 'undefined')) {
      let authoritiesGuardado: string | null =  localStorage.getItem("authorities");
      return authoritiesGuardado!=null ?  (authoritiesGuardado): null;
    }
  return null;
  }

}
