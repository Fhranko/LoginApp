import { Injectable } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth } from "@angular/fire/auth";
import { UsuarioModel } from "../models/usuario.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private angularModule: AngularFireModule,
    public angularAuth: AngularFireAuth
  ) {}

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
}
