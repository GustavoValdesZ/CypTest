import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccionPage } from './accion.page';
import { GodOfWarPage } from './god-of-war/god-of-war.page'; 

const routes: Routes = [
  {
    path: '',
    component: AccionPage
  },
  {
    path: 'god-of-war',  
    component: GodOfWarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccionPageRoutingModule {}
