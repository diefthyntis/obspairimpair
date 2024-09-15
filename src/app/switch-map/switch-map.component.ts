import { Component, OnInit } from '@angular/core';
import { interval, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss']
})
export class SwitchMapComponent implements OnInit {
  sentenceToDisplay!:string;
  
  constructor() { }


  ngOnInit() {
    const source$ = interval(1000); // émet toutes les secondes

    /*
    Le switchMap annule l'observable précédent 
    lorsqu'un nouvel observable est émis. Cela est utile lorsqu'on ne veut pas 
    que les appels précédents continuent si un nouveau déclencheur est survenu.
    */
    source$.pipe(
      switchMap(val => of(`Nouvelle valeur émise: ${val}`))
    ).subscribe(result => {
      console.log(result);
      this.sentenceToDisplay = result;
    }
    );
  }

}
