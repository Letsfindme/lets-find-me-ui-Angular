import {Component, ViewEncapsulation} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
import {PostCreationComponent} from '../post-creation/post-creation.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
    .pipe(
      map(result => result.matches)
    );

  constructor(private _router: Router,
              private breakpointObserver: BreakpointObserver) {}
              ngOnInit() {
    this.isHandset$.subscribe(isHandset => console.log(isHandset));
  }

}
