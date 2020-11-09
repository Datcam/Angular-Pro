import {
  Component,
  OnInit,
  Input,
  Output,
  AfterContentInit,
  ContentChild,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  QueryList,
  ChangeDetectorRef,
  ElementRef,
  Renderer2
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthRememberComponent } from './auth-remember.component';
import { AuthMessageComponent } from './auth-message.component';
import { User } from '../app.component';

@Component({
  selector: 'app-auth',
  styles: [`
    .email {
      border-color: #9f72e6
    }
  `],
  template: `<form (ngSubmit)="clickEvent(form.value)" #form="ngForm" novalidate>
      <h3>
        {{title}}
      </h3>
      <div>
        <label>
          Name: <input
          name="userName"
          type="text"
          [ngModel]="data?.userName"
        >
        </label>
      </div>
    <div>
      <label>
        Surname: <input
        name="surName"
        [ngModel]="data?.surName"
        type="text"
      >
      </label>
    </div>
    <div>
      <label>
        Email: <input
        name="email"
        [ngModel]="data?.email"
        type="email"
        #email
      >
      </label>
    </div>
    <ng-content select="app-auth-remember"></ng-content>
    <app-auth-message [style.display]="showMessage ? 'inherit' : 'none'"></app-auth-message>
    <div>
      <button type="submit">Login</button>
    </div>
    </form>
  `
})

export class AuthComponent implements OnInit, AfterContentInit, AfterViewInit {
  showMessage: boolean;
  title = 'Login login';
  data: User = {
    userName: '',
    surName: '',
    email: '',
  };
  @ViewChildren(AuthMessageComponent) message: QueryList<AuthMessageComponent>;
  @ContentChild(AuthRememberComponent) remember: AuthRememberComponent;
  @ViewChild('email') email: ElementRef;
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private renderer: Renderer2,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {}
  ngAfterContentInit(): void {
    if (this.remember) {
      this.remember.checked.subscribe((value: boolean) => this.showMessage = value);
    }
  }

  ngAfterViewInit(): void {
    if (this.email) {
      this.renderer.setAttribute(this.email.nativeElement, 'placeholder', 'Enter your email, right now');
      this.renderer.addClass(this.email.nativeElement, 'email');
      this.renderer.listen(this.email.nativeElement, 'focus', (event: any) => {console.log(event);});
      this.renderer.selectRootElement(this.email.nativeElement).focus();
      // this.email.nativeElement.setAttribute('placeholder', 'Enter your email');
      // this.email.nativeElement.classList.add('email');
      // this.email.nativeElement.focus();
    }
    this.message.forEach((item) => {
      item.days = 31;
    });
    this.cd.detectChanges();
  }

  clickEvent(value: any): void {
    this.submitted.emit({
      message: 'Button has been clicked',
      value
    });
  }
}


