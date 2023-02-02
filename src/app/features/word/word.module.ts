import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { SearchWordComponent } from './components/search-word/search-word.component';
import { WordMeaningComponent } from './components/word-meaning/word-meaning.component';
import { WordRoutingModule } from './word-routing.module';
import { WordComponent } from './pages/home/word.component';

@NgModule({
  declarations: [WordComponent, SearchWordComponent, WordMeaningComponent],
  imports: [CommonModule, ShareModule, WordRoutingModule],
  exports: [WordComponent],
})
export class WordModule {}
