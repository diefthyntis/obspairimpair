import { Component, OnInit } from '@angular/core';
import { concatMap, delay, interval, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.scss']
})
export class MergeMapComponent implements OnInit {
  sentenceToDisplay:string="";
  constructor() { }

  ngOnInit(): void {
     // Source lumineuse qui émet du bleu
     const blueLight$ = of('Blue light').pipe(delay(100)); // Émet après 1 seconde

     // Source lumineuse qui émet du jaune
     const yellowLight$ = of('Yellow light').pipe(delay(100)); // Émet après 2 secondes
 
     // Source lumineuse qui émet du rouge
     const redLight$ = of('Red light').pipe(delay(100)); // Émet après 3 secondes
 
     // Simuler un flux d'événements (peut représenter un timer par exemple)
     const lightCycle$ = interval(100); // Émet toutes les 4 secondes
 
     // Utilisation de mergeMap pour fusionner les trois sources lumineuses
     lightCycle$.pipe(mergeMap(() => redLight$)).pipe(mergeMap(()=>yellowLight$)).pipe(mergeMap(()=>blueLight$))
      .subscribe(result => {
        console.log(result);
        this.sentenceToDisplay = this.sentenceToDisplay + result;    
      });
    }

}
