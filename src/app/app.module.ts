import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwitchMapComponent } from './switch-map/switch-map.component';
import { PairImpairComponent } from './pair-impair/pair-impair.component';
import { MergeMapComponent } from './merge-map/merge-map.component';

@NgModule({
  declarations: [
    AppComponent,
    SwitchMapComponent,
    PairImpairComponent,
    MergeMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
