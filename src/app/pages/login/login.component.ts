import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

import { UsuarioModel } from "src/app/models/usuario.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private authFire: AngularFireAuth
  ) {}

  ngOnInit() {
    if (localStorage.getItem("email")) {
      this.usuario.email = localStorage.getItem("email");
      this.recordarme = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      type: "info",
      text: "espere por favor",
    });

    Swal.showLoading();

    this.auth
      .login(this.usuario)
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
