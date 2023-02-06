import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, ShareModule],
  exports: [HeaderComponent],
})
export class LayoutModule {}
