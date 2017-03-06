import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AgarreComponent } from './agarre/agarre.component';
import { InicioComponent } from './inicio/inicio.component';
import {routing} from "./app.routes";
import {MasterUrlService} from "./master-url.service";

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    AgarreComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    MasterUrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
