import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SearchModule } from './features/search/search.module';
import { ShareModule } from './features/share/share.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ShareModule, SearchModule, CommonModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
