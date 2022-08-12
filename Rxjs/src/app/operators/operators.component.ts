import { Component, OnInit } from '@angular/core';
import {
  take,
  map,
  combineAll,
  startWith,
  delay,
  concatAll,
  endWith,
  finalize,
  mergeMap,
  catchError,
  mapTo,
} from 'rxjs/operators';
import {
  combineLatest,
  concat,
  empty,
  forkJoin,
  interval,
  merge,
  of,
  throwError,
  timer,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss'],
})
export class OperatorsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // rxjs combineAll
    // this.combineAllExample();
    // rxjs combineLastest
    // this.combineLatestExample1();
    // rxjs concat
    // this.concatExample1();
    // this.concatExample2();
    // this.concatExample3();
    //concatAll
    // this.concatAllExample1();
    // this.concatAllExample2();
    // this.concatAllExample3();

    // EndWith
    // this.endWithExample1();
    // this.endWithExample2();
    // this.endWithExample3();

    // forkJoin
    // this.forkJoinExample1();
    // this.forkJoinExample2();
    // this.forkJoinExample3();
    // this.forkJoinExample4();
    this.forkJoinExample5();

    // merge
    this.mergeExample1();
  }

  observer = {
    next: (val: any) => console.log(`Observer : ${val}`),
    error: (err: any) => console.log(`Observer Error: ${err}`),
    complete: () => console.log(`Observer complete`),
  };

  // rxjs combineAll
  combineAllExample = () => {
    const source$ = interval(100).pipe(take(2));
    const example$ = source$.pipe(
      map((val) => interval(100).pipe(map((i) => `Result (${val}) : ${i}`))),
      take(5)
    );

    example$.pipe(combineAll()).subscribe(console.log);
  };

  // rxjs combineLastest
  combineLatestExample1 = () => {
    const timerOne$ = timer(1000, 4000);
    const timerTwo$ = timer(2000, 4000);
    const timerThree$ = timer(3000, 4000);

    combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(
      ([timerValOne, timeValTwo, timerValThree]) => {
        console.log(
          `Timer One Latest: ${timerValOne}`,
          `Timer Two Latest: ${timeValTwo}`,
          `Timer Three Latest: ${timerValThree}`
        );
      }
    );
  };

  // rxjs concat
  concatExample1 = () => {
    const one = of(1, 2, 3);
    const two = of(4, 5, 6);
    const three = of(7, 8, 9);

    concat(one, two, three).subscribe(console.log);
  };
  concatExample2 = () => {
    const delayedMessage = (message: any, delayedTime = 1000) => {
      return empty().pipe(startWith(message), delay(delayedTime));
    };

    concat(
      delayedMessage('Get Ready!'),
      delayedMessage(3),
      delayedMessage(2),
      delayedMessage(1),
      delayedMessage('Go!'),
      delayedMessage('', 2000)
    ).subscribe((message: any) => console.log(message));
  };

  concatExample3 = () => {
    concat(interval(1000), of('This', 'Never', 'Runs')).subscribe(console.log);
  };
  //=============================================================================
  //concatAll
  // concatAll with observable
  concatAllExample1 = () => {
    const source = interval(2000);
    const example = source.pipe(
      map((val) => of(val + 10)),
      concatAll()
    );

    example.subscribe((val) =>
      console.log('Example with Basic Observable:', val)
    );
  };

  //concatAll with promise
  concatAllExample2 = () => {
    const samplePromise = (val: any) => new Promise((resolve) => resolve(val));
    const source = interval(2000);

    const example = source.pipe(
      map((val) => samplePromise(val)),
      concatAll()
    );

    example.subscribe((val) => console.log('Example with Promise:', val));
  };

  //Delay white inner observables complete
  concatAllExample3 = () => {
    const obs1 = interval(1000).pipe(take(5));
    const obs2 = interval(500).pipe(take(2));
    const obs3 = interval(2000).pipe(take(1));

    const source = of(obs1, obs2, obs3);
    const example = source.pipe(concatAll());

    example.subscribe(this.observer);
  };

  //===============================================================================
  // EndWith
  // Basic endWith
  endWithExample1 = () => {
    const enum Source {
      HELLO = 'Hello',
      FRIEND = 'Friend',
      GOODBYE = 'Goodbye',
    }
    const source$ = of('Hello', 'Friend', 'Goodbye');

    source$.pipe(endWith(Source.FRIEND)).subscribe(this.observer);
  };

  //endWith multiple values
  endWithExample2 = () => {
    const enum Source {
      HELLO = 'Hello',
      FRIEND = 'Friend',
      GOODBYE = 'Goodbye',
    }
    const source$ = of('Hello', 'Friend');

    source$
      .pipe(endWith(Source.GOODBYE, Source.FRIEND))
      .subscribe(this.observer);
  };

  // Comparison to finalize

  endWithExample3 = () => {
    const enum Source {
      HELLO = 'Hello',
      FRIEND = 'Friend',
      GOODBYE = 'Goodbye',
    }
    const source$ = of(Source.HELLO, Source.FRIEND);
    source$
      .pipe(
        endWith(Source.GOODBYE, Source.FRIEND),
        finalize(() => console.log('Finally'))
      )
      .subscribe(this.observer);
  };

  //==============================================================================================ư
  myPromise = (val: any) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(`Promise Resolved: ${val}`);
      }, 5000)
    );
  };
  // forkJoin
  //Using a dictionảy of sources to make AJAX request
  forkJoinExample1 = () => {
    const google = ajax.getJSON('https://api.github.com/users/google');
    const microsoft = ajax.getJSON('https://api.github.com/users/microsoft');
    const users = ajax.getJSON('https://api.github.com/users');

    forkJoin({
      google: google,
      microsoft: microsoft,
      users: users,
    }).subscribe(console.log);
  };

  // Observables completing after different durations
  forkJoinExample2 = () =>
    forkJoin({
      sourceOne: of('Hello'),
      sourceTwo: of('World').pipe(delay(1000)),
      sourceThree: interval(1000).pipe(take(1)),
      sourceFour: interval(1000).pipe(take(2)),
      sourceFive: this.myPromise('RESULT'),
    }).subscribe(console.log);

  // Making a variable number of request (uses deprecated API)
  forkJoinExample3 = () => {
    const source = of([1, 2, 3, 4, 5]);
    const example = source.pipe(
      mergeMap((q) => forkJoin(...q.map(this.myPromise)))
    );
    example.subscribe(this.observer);
  };

  //Handling errors on outside
  forkJoinExample4 = () => {
    const example = forkJoin({
      sourceOne: of('Hello'),
      sourceTwo: of('World').pipe(delay(1000)),
      sourceThree: throwError('This will error'),
    });
    example.subscribe(this.observer);
  };

  // Getting successful results when one inner observable errors
  forkJoinExample5 = () => {
    const example = forkJoin({
      sourceOne: of('Hello'),
      sourceTwo: of('World').pipe(delay(1000)),
      sourceThree: throwError('This will error').pipe(
        catchError((error) => of(error))
      ),
    });
    example.subscribe(console.log);
  };

  //=============================================================================================================================
  // merge
  // merging multiple observables, static method

  mergeExample1 = () => {
    const first = interval(2500);
    const second = interval(2000);
    const third = interval(1500);
    const fourth = interval(1000);

    const example = merge(
      first.pipe(mapTo('FIRST!')),
      second.pipe(mapTo('SECOND!')),
      third.pipe(mapTo('THIRD!')),
      fourth.pipe(mapTo('FOURTH!'))
    );
    example.subscribe(console.log);
  };

  mergeExample2 = () => {
    const first = interval(2500);
    const second = interval(1000);
  }
}
