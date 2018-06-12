import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  // [KEY]: To hold the Subscriptions as properties, so we can manually un-subscribe in ngOnDestroy():
  numbersObsSubscription: Subscription;   
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() 
  {

    // ----------------------
    // Build-in Observable:
    // ----------------------    
    const myNumbers = Observable.interval( 1000 );      // Emits every second

    // ----------------------
    // Subscribe it Build-in Observable
    // ----------------------     
    this.numbersObsSubscription = myNumbers.subscribe
    (
      ( myNumber: number ) =>
      {
        console.log( myNumber );
      }
    );

    // ----------------------
    // Custom Observable:
    // ----------------------
    const myObservable = 
      Observable.create
      (
        ( myObserver: Observer<string> ) =>
        {
          // Emit 3 times.

          setTimeout
          (
            () => myObserver.next( "First Package" )        // Emit the 1st package after 2 secs
            ,2000 
          );

          setTimeout
          (
            () => myObserver.next( "Second Package" )       // Emit the 2nd package after 4 secs
            ,4000 
          );         
          
          setTimeout
          (
            () => myObserver.next( "3rd Package" )          // Emit the 3rd package after 5 secs
            ,5000 
          );

          setTimeout
          (
            // () => myObserver.error( "Failed!!!" )        // Emit error after 5 secs
            () => myObserver.complete()                     // Emit complete after 5 secs
            ,7000 
          );          
        }
      );   

      // ----------------------
      // Subscribe to Custom Observable
      // ----------------------
      this.customObsSubscription = myObservable.subscribe
      (
        ( data: string ) => { console.log( data ); },       // [KEY]: Called when success
        ( error: string ) => { console.log( error ); },     // [KEY]: Called when error
        () => { console.log( "Completed!" ); }              // [KEY]: Called when completed
      );
  }

  // [KEY] To un-subscribe Subscribables
  ngOnDestroy(){

    this.numbersObsSubscription.unsubscribe();    // [KEY]
    this.customObsSubscription.unsubscribe();     // [KEY]
  }

}
