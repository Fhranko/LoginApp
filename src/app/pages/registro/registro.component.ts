import { Component, OnInit } from "@angular/core";
import { UsuarioModel } from "src/app/models/usuario.model";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;
  recordarme = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private authFire: AngularFireAuth
  ) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    
    Swal.fire({
      allowOutsideClick: false,
      type: "info",
      text: "espere por favor",
    });

    this.auth
      .nuevoUsuario(this.usuario)
      .then((res) => {
        Swal.close();
        this.router.navigateByUrl("/home");
        
        if (this.recordarme) {
          localStorage.setItem("email", this.usuario.email);
        }

        this.authFire.auth.currentUser.getIdToken().then((res) => {
          localStorage.setItem("token", res);
        });
      })
      .catch((err) => {
        Swal.fire({
          type: "error",
          title: "Error al autenticar",
          text: err,
        });
      });
  }
}
