import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  ComponentRef,
  TemplateRef
} from '@angular/core';
import { AuthComponent } from './auth/auth.component';

export interface User {
  userName: string;
  surName: string;
  email: string;
}

@Component({
  selector: 'app-root',
  template: `
    <div>
      <!--  <app-auth-->
      <!--      [data]="data"-->
      <!--    (submitted)="signIn($event)"-->
      <!--  >-->
      <!--    <h3>Login</h3>-->
      <!--    <button type="submit">-->
      <!--      Login-->
      <!--    </button>-->
      <!--    <app-auth-remember (checked)="onChecked($event)"></app-auth-remember>-->
      <!--  </app-auth>-->
      <button (click)="destroyComponent()">Destroy</button>
      <button (click)="moveComponent()">Move</button>
      <div #entry></div>
      <div class="test">
        <ng-container [ngTemplateOutlet]="test" [ngTemplateOutletContext]="dataTr"><div>Hello</div></ng-container>
      </div>
      <ng-template #test let-firstName="name" let-lastName>
        {{ firstName }} : {{ lastName }}
      </ng-template>
      <ng-template #tmpl let-name="jjj" let-location="location" let-age="age" let-imps let-ggg>
        {{ name }} : {{ location }} : {{ age }} : {{ imps }} : {{ imps }} :: {{ ggg }}
      </ng-template>
    </div>

  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, AfterContentInit {
  component: ComponentRef<AuthComponent>;
  dataTr = {
    name: 'Sevate',
    $implicit: 'Klets'
  };
  @ViewChild('entry', {static: true, read: ViewContainerRef}) entry: ViewContainerRef;
  @ViewChild('tmpl') tmpl: TemplateRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver
  ) {}

  rememberMe = false;
  data: any = {
    userName: 'Maksym',
    surName: 'Klets',
    email: 'klecdeveloper@gmail.com',
  };
  ngAfterContentInit(): void {}

  ngAfterViewInit(): void {
    const authFormFactory = this.resolver.resolveComponentFactory(AuthComponent);
    this.entry.createComponent(authFormFactory);
    this.component = this.entry.createComponent(authFormFactory, 0);
    this.entry.createEmbeddedView(this.tmpl, {
      jjj: 'Klets KLets',
      location: 'Ukraine, Lviv',
      age: 26,
      $implicit: 'Some Data'
    });
    this.component.instance.title = 'Create account';
    this.component.instance.data = this.data;
    this.component.instance.submitted.subscribe(this.loginUser);
  }

  signIn(event: any): void {
    console.log('Sign in: ',  event);
  }

  signUp(event: any): void {
    console.log('Sign up: ', event);
  }

  onChecked(event: boolean): void {
    this.rememberMe = event;
    console.log('Event: ', event);
  }

  loginUser(user: User): void {
    console.log(user);
  }

  destroyComponent(): void {
    this.component.destroy();
  }

  moveComponent(): void {
    this.entry.move(this.component.hostView, 1);
  }
}
