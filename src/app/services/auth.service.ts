import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { UsuarioModel } from "../models/usuario.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private angularAuth: AngularFireAuth) {
    this.leerToken();
  }

  userToken: string;

  logOut(){
    localStorage.removeItem('token');
  }

  nuevoUsuario(usuario: UsuarioModel) {
    return this.angularAuth.auth.createUserWithEmailAndPassword(
      usuario.email,
      usuario.password
    );
  }

  login(usuario: UsuarioModel) {
    return this.angularAuth.auth.signInWithEmailAndPassword(
      usuario.email,
      usuario.password
    );
  }

  guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem("token", idToken);
  }

  leerToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {
    return this.userToken.length > 2;
  }
}
