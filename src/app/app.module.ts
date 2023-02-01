import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontMenuComponent } from './components/font-menu/font-menu.component';
import { TextButtonComponent } from './components/text-button/text-button.component';

@NgModule({
  declarations: [AppComponent, FontMenuComponent, TextButtonComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
