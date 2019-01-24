import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthService} from '../core/auth.service';
import {TokenStorage} from '../core/token.storage';
import {HttpErrorResponse} from '@angular/common/http';
import {first} from 'rxjs/operators';

// noinspection JSAnnotator
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loading: boolean;
  color = 'accent';
  mode = 'determinate';
  intervalId: NodeJS.Timer;
  seconds = 0;
  message;
  show = false;
  error = '';

  constructor(private router: Router,
              public dialog: MatDialog,
              private authService: AuthService,
              private token: TokenStorage) {
  }

  username: string;
  password: string;


  login(): void {
    this.loading = true;
    this.intervalId = setInterval(() => this.counte(), 10);
    setTimeout(() => {
      console.log("  this.loading !== true ");
      this.authService.attemptAuth(this.username, this.password)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['user']);
          },
          error => {
            this.error = error;
            this.loading = false;
          });
    },1000);
}

  counte() {
    this.show = true;
    while (this.seconds < 100) {
      this.seconds++;
      console.log(this.seconds);
      if (this.seconds == 100) {
        this.loading = false;
        console.log("  this.loading !== true ");
      }
      return;
    }
  }
}

    /*
    this.show = false;

    this.authService.attemptAuth(this.username, this.password)
      .subscribe(
      data => {
        this.token.saveToken(data.token);
        this.router.navigate(['user']);
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        }
    );

  }

}


/*

if (this.username === 'admin' && this.password === 'admin') {
        this.router.navigate(['user']);
      } else {
        this.message = 'Invalid credentials';
      }

 this.intervalId = setInterval(() => this.timer(), 10);

timer() {
    console.log(this.seconds);
    this.seconds--;
    if (this.seconds === 0) {
      clearInterval(this.intervalId);
      console.log(this.seconds);
      return;
    }
  }

const maxLoops = 50;
let counter = 0;

(function next() {
  if (counter++ > maxLoops) {
    return;
  }

  setTimeout(function () {
    console.log(this.value);
    this.value++;
    next();
  }, 10);
})();
}
}



for ( this.value ; this.value <= 90; this.value++) {}
return new Promise(resolve => {
setTimeout(() => {
resolve(x);
}, 2000);
});



while (this.value <= 100) {
setTimeout(500);
this.value += 1;
}
if (this.username === 'admin' && this.password === 'admin') {
this.router.navigate(['user']);
} else {
alert('Invalid credentials');
}

*/



