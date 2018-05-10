import { Component } from '@angular/core';
import { trigger, transition, group, query, style, animate} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimation', [
      transition('1 => 5, 1 => 6, 1 => 7, 3 => 4', [
        style({ height: '!'}),
        query(':enter', style( { transform: 'translateX(100%)'})),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0})),
        group([
          query(':leave', [
            animate('0.5s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translateX(-100%)'})),
          ]),
          query(':enter', animate('0.5s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translateX(0)'}))),
        ]),
      ]),
      transition('5 => 1, 6 => 1, 7 => 1', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        // animate the leave page away
        group([
            query(':leave', [
                animate('0.5s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
            ]),
            // and now reveal the enter
            query(':enter', animate('0.5s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
        ]),
      ]),
      transition('2 => 1, 4 => 1', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateY(100%)' })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        // animate the leave page away
        group([
            query(':leave', [
                animate('0.5s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
            ]),
            // and now reveal the enter
            query(':enter', animate('0.5s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
        ]),
      ]),
      transition('1 => 2, 1 => 4', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateY(-100%)' })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        // animate the leave page away
        group([
            query(':leave', [
                animate('0.5s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
            ]),
            // and now reveal the enter
            query(':enter', animate('0.5s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
        ]),
      ]),
    ])
  ]
})
export class AppComponent {
  title = 'app';

  getDepth(outlet) {
    return outlet.activatedRouteData['depth'];
  }
}
