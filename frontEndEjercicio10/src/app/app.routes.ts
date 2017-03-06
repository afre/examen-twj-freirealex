import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {InicioComponent} from "./inicio/inicio.component";
import {UsuarioComponent} from "./usuario/usuario.component";
import {AgarreComponent} from "./agarre/agarre.component";
export const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'agarre', component: AgarreComponent},
  {path: '', redirectTo: 'inicio', pathMatch: 'full'}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
