import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordComponent } from './word.component';
import { ShareModule } from '../share/share.module';
import { SearchWordComponent } from './components/search-word/search-word.component';

@NgModule({
  declarations: [WordComponent, SearchWordComponent],
  imports: [CommonModule, ShareModule],
  exports: [WordComponent],
})
export class WordModule {}
