import { Component, OnInit } from '@angular/core';
import { filter, interval, map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'obspairimpair';
  //analysisStream!:Subscription;
  observer!:Subscription;
  analysis!:string;
  commentaire!:string;


  ngOnInit(): void {
    const analysisStream$= interval(100).pipe (
      // si le retour de la fonction lambda x % 3 === 0 vaut true, alors la valeur sera retenue
      filter(x => x % 3 === 0),
      map(x => x % 2===0 ? 
        'Je suis '+x+' et je suis pair et je suis divisible par 3':
        'Je suis '+x+' et je suis impair  et je suis divisible par 3'
      ),
      // à ce stade, la valeur contenu par x dans 
      //l'opérateur Tap est déjà la phrase "je suis pair" ...
      // l'opérateur permet de gérer des "side effect"
      // ici le side effet est l'appel de la méthode logger
      tap(x => this.logger("@@"+x))
    );
    this.observer= analysisStream$.subscribe(value => { 
      this.analysis=value;
    });

   

    setTimeout(()=> {
        this.observer.unsubscribe();
        this.commentaire="Temps écoulé";
    },20000);
 

    throw new Error('Method not implemented.');
  }
  
  //
  logger(text:string) {
    console.log("##" + text);
  };

 

}
