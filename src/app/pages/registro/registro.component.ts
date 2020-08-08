import { Component, OnInit } from "@angular/core";
import { UsuarioModel } from "src/app/models/usuario.model";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
    // if (localStorage.getItem("email")) {
    //   this.usuario.email = localStorage.getItem("email");
    //   this.recordarme = true;
    // }
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
