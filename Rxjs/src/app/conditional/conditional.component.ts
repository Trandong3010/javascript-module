import { Component, OnInit } from '@angular/core';
import {
  concat,
  defaultIfEmpty,
  delay,
  empty,
  every,
  from,
  fromEvent,
  iif,
  interval,
  mergeMap,
  of,
  sequenceEqual,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-conditional',
  templateUrl: './conditional.component.html',
  styleUrls: ['./conditional.component.scss'],
})
export class ConditionalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // defaultIfEmpty
    // this.defaultIfEmptyExample();
    // this.defaultIfEmptyExample2();

    // every
    // this.everyExample();
    // this.everyExample2();
    // this.everyExample3();

    // iif
    // this.iifExample();

    // sequenceEqual
    this.sequenceEqualExample();
  }

  //============================================================================================================================
  // defaultIfEmpty
  // Default for empty value
  defaultIfEmptyExample = () => {
    const exampleOne = of().pipe(defaultIfEmpty('Observable.of() Empty!'));
    exampleOne.subscribe((val) => console.log(val));
  };

  // Default for Observable.empty
  defaultIfEmptyExample2 = () => {
    const example = empty().pipe(defaultIfEmpty('Observable.Empty()!'));
    example.subscribe((val) => console.log(val));
  };

  //===============================================================================================================================
  // every
  // Some values false
  everyExample = () => {
    const source = of(1, 2, 3, 4, 5);
    const example = source.pipe(every((val) => val % 2 === 0));
    example.subscribe((val) => console.log(val));
  };

  // All values true
  everyExample2 = () => {
    const allEvents = of(2, 4, 6, 8, 10);
    const example = allEvents.pipe(every((val) => val % 2 === 0));
    example.subscribe((val) => console.log(val));
  };

  // Values arriving over time and completing stream prematurely due to every returning false
  everyExample3 = () => {
    const log = console.log;
    const returnCode = (request: any) =>
      Number.isInteger(request) ? 200 : 400;
    const fakeRequest = (request: any) =>
      of({ code: returnCode(request) }).pipe(
        tap((_) => log(request)),
        delay(1000)
      );
    const apiCalls$ = concat(
      fakeRequest(1),
      fakeRequest('invalid payload'),
      fakeRequest(2)
    ).pipe(
      every((e) => e.code === 200),
      tap((e) => log(`all request successful: ${e}`))
    );
    apiCalls$.subscribe();
  };

  // =========================================================================================================================
  // iif
  // simple iif
  iifExample = () => {
    const r$ = of('R');
    const x$ = of('X');

    interval(1000)
      .pipe(mergeMap((v) => iif(() => v % 4 === 0, r$, x$)))
      .subscribe(console.log);
  };

  //==============================================================================================================================
  // sequenceEqual
  // Simple sequenceEqual
  sequenceEqualExample = () => {
    const expectedSequence = from([4, 5, 6]);

    of([1, 2, 3], [4, 5, 6], [7, 8, 9])
      .pipe(switchMap((arr) => from(arr).pipe(sequenceEqual(expectedSequence))))
      .subscribe(console.log);
  };
}
