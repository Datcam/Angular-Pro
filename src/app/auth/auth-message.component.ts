import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-auth-message',
  template: `
  <div>
      You will be logged in for {{days}} days
    </div>
  `
})

export class AuthMessageComponent implements DoCheck {
  days = 7;
  ngDoCheck(): void {}
}
