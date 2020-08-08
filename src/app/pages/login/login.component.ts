import { Component, OnInit } from "@angular/core";
import { UsuarioModel } from "src/app/models/usuario.model";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { flatten } from "@angular/core/src/render3/util";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) {}

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
