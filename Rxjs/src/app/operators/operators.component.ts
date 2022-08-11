import { Component, OnInit } from '@angular/core';
import { take, map, combineAll } from 'rxjs/operators';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss'],
})
export class OperatorsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.combineAllExample();
  }

  combineAllExample = () => {
    const source$ = interval(100).pipe(take(2));
    const example$ = source$.pipe(
      map((val) => interval(100).pipe(map((i) => `Result (${val}) : ${i}`))),
      take(5)
    );

    example$.pipe(combineAll()).subscribe(console.log);
  };

  combineLatestExample1 = () => {
    const timerOne$ = timer(1000, 4000);
  }
}
