import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwitchMapComponent } from './switch-map/switch-map.component';
import { PairImpairComponent } from './pair-impair/pair-impair.component';
import { MergeMapComponent } from './merge-map/merge-map.component';

const routes: Routes = [
  { path:'',component:MergeMapComponent},
  { path:'pairimpair',component:PairImpairComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
