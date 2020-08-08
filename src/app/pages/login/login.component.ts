import { Component, OnInit } from "@angular/core";
import { UsuarioModel } from "src/app/models/usuario.model";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

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

    console.log(form);

    this.auth
      .login(this.usuario)
      .then((res) => {
        console.log(`Resultado de res ${res}`);
        console.log(res);
        Swal.close();
        this.router.navigateByUrl('/home')
      })
      .catch((err) => {
        console.log(`Resultado de err ${err}`);
        Swal.fire({
          type: "error",
          title: "Error al autenticar",
          text: err,
        });
      });
  }
}
