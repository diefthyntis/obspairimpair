import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'obspairimpair';
  //analysisStream!:Subscription;
  observer!:Subscription;
  analysis!:string;
  commentaire!:string;

  /*
  L'observable subjet émet seulement sur demande
  */
  private destroy$!:Subject<boolean>;
  public chrono$:Observable<number> | undefined;

  ngOnInit(): void {
    this.destroy$= new Subject<boolean>();
    this.chrono$=interval(1000);
    const analysisStream$= interval(100).pipe (
      // si le retour de la fonction lambda x % 3 === 0 vaut true, alors la valeur sera retenue
      filter(x => x % 3 === 0),
      takeUntil(this.destroy$),
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

  ngOnDestroy(): void {
    /*
    ngOnDestroy est un lifecycle hook 
    Un Observable souscrit dans le code typescript qui ne complète pas risque de créer 
    des fuites de mémoire.
    Il faut mettre en place une stratégie de destruction de cet observable.
    l'observable analysisStream$ s'arrête d'émettre quand destroy$ commence à émettre.
    l'observable émet seulement une seule fois à la destruction du composant.
    A la destruction du composant, l'observable destroy$ émet une seul fois puis complète 
    cela remplit la condition  pour cesser l'émission de analysisStream$
    
    */
      this.destroy$.next(true);
  }

  /*
 Vous n'avez donc pas à vous inquiéter des fuites de mémoire avec 
 les Observables souscrits avec le pipe  async dans le template HTML! 
 La conséquence de ce comportement est que seuls les Observables souscrits 
 avec la méthode  subscribe()  nécessitent une stratégie spécifique de unsubscribe.
*/
}
