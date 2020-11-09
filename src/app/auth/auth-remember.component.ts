import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth-remember',
  styles: [],
  template: `
  <label>
    <input type="checkbox" (change)="onChecked($event.target.checked)">
    Keep me logged in
  </label>`
})

export class AuthRememberComponent {
  @Output() checked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  onChecked(value: boolean): void {
    this.checked.emit(value);
  }
}
