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
    this.angularAuth.auth.createUserWithEmailAndPassword(
      usuario.email,
      usuario.password
    ).then((res)=>{
      console.log(res)
      console.log("Usuario Creado satisfactoriamente")
    }).catch((err)=>{
      console.log(err)
      console.log("ERROR an intentar crear usuario")
    })
    
  }

  login(usuario: UsuarioModel) {
    this.angularAuth.auth
      .signInWithEmailAndPassword(usuario.email, usuario.password)
      .then((res) => {
        console.log(res);
        console.log("Usuario logueado");
      })
      .catch((err) => {
        console.log(err.message);
        console.log("ERROR");
      });
  }
}
