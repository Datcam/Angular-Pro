// Core modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Own modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { AuthComponent } from './auth/auth.component';
import { AuthRememberComponent } from './auth/auth-remember.component';
import { AuthMessageComponent } from './auth/auth-message.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AuthRememberComponent,
    AuthMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AuthComponent
  ]
})
export class AppModule { }
