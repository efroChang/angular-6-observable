import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() 
  {
    // const myNumbers = Observable.interval( 1000 );      // Emits every second

    // myNumbers.subscribe
    // (
    //   ( myNumber: number ) =>
    //   {
    //     console.log( myNumber );
    //   }
    // );

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
            () => myObserver.next( "First Package" )        // Eit the 1st package after 2 secs
            ,2000 
          );

          setTimeout
          (
            () => myObserver.next( "Second Package" )       // Emit the 2nd package after 4 secs
            ,4000 
          );         
          
          setTimeout
          (
            () => myObserver.next( "3rd Package" )       // Emit the 3rd package after 5 secs
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
      // Observer / Subscriber
      // ----------------------
      myObservable.subscribe
      (
        ( data: string ) => { console.log( data ); },       // [KEY]: Called when success
        ( error: string ) => { console.log( error ); },     // [KEY]: Called when error
        () => { console.log( "Completed!" ); }              // [KEY]: Called when completed
      );
  }

}
