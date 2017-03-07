import {Component, OnInit, Input} from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../master-url.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-agarre',
  templateUrl: './agarre.component.html',
  styleUrls: ['./agarre.component.css']
})
export class AgarreComponent implements OnInit {

  private _parametros: any;
  agarres=[];
  nuevoAgarre={};

  constructor(private _ActivedRoute: ActivatedRoute, private _http:Http,private _masterURL:MasterUrlService) { }

  ngOnInit() {

    this.listarAgarre();

  }



  crearAgarre(formulario: NgForm) {


    this._http.post(this._masterURL.url + "agarre", {
      nombre: formulario.value.nombre,
      veces:formulario.value.veces,
      dineroGastado:formulario.value.dineroGastado,
      idUsuario:this._parametros.idUsuario
    }).subscribe(
      (res:Response) => {

        this.agarres.push(res.json());
        this.agarres[this.agarres.length-1].formularioCerrado=true;
        this.nuevoAgarre = {};

      },
      (err) => {
        console.log("Ocurrio un error", err);
      }
    );


  }

  listarAgarre(){
    this._ActivedRoute.params.subscribe(
      parametros=>{
        this._parametros=parametros;
        this._http.get(this._masterURL.url+'agarre?idUsuario='+this._parametros.idUsuario)
          .subscribe(
            (res:Response)=>{
              this.agarres=res.json().map((value)=>{
                value.formularioCerrado=true;
                return value;
              });

            },
            (err) => {
              console.log("Ocurrio un error", err);
            }
          );
      }
    )


  }

  borrarAgarre(id: number) {
    this._http.delete(this._masterURL.url + "agarre/" + id)
      .subscribe(
        (res) => {
          let agarreBorrado = res.json();
          this.agarres = this.agarres.filter(value => agarreBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  editarAgarre(agarre: any) {
    let parametros = {
      nombre: agarre.nombre,
      veces:agarre.veces,
      dineroGastado:agarre.dineroGastado,
      idUsuario:this._parametros.idUsuario
    };
    this._http.put(this._masterURL.url + "agarre/" + agarre.id, parametros)
      .subscribe(
        (res: Response) => {
          agarre.formularioCerrado = !agarre.formularioCerrado;

        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
