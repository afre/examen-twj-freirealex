import {Component, OnInit, Input} from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios=[];
nuevoUsuario={};


  constructor(private _http:Http,private _masterURL:MasterUrlService) { }

  ngOnInit() {

this.listarUsuario();

  }



  crearUsuario(formulario: NgForm) {


    this._http.post(this._masterURL.url + "usuario", {
      nombre: formulario.value.nombre,
      preferencia:formulario.value.preferencia,
      fechaNacimiento:formulario.value.fechaNacimiento
    }).subscribe(
      (res) => {

        this.usuarios.push(res.json());
        this.usuarios[this.usuarios.length-1].formularioCerrado=true;
        this.nuevoUsuario = {};

      },
      (err) => {
                console.log("Ocurrio un error", err);
      }
    );


  }

  listarUsuario(){
    this._http.get(this._masterURL.url+"usuario")
      .subscribe(
        (res:Response)=>{
          this.usuarios=res.json().map((value)=>{
            value.formularioCerrado=true;
            return value;
          });

        },
        (err) => {
          console.log("Ocurrio un error", err);
        }
      );

  }

  borrarUsuario(id: number) {
    this._http.delete(this._masterURL.url + "usuario/" + id)
      .subscribe(
        (res) => {
          let usuarioBorrado = res.json();
          this.usuarios = this.usuarios.filter(value => usuarioBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  editarUsuario(usuario: any) {
    let parametros = {
      nombre: usuario.nombre,
      preferencia:usuario.preferencia,
      fechaNacimiento:usuario.fechaNacimiento
    };
    this._http.put(this._masterURL.url + "usuario/" + usuario.id, parametros)
      .subscribe(
        (res: Response) => {
          usuario.formularioCerrado = !usuario.formularioCerrado;

        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
