import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { WordHeadingComponent } from './components/word-heading/word-heading.component';
import { WordMeaningComponent } from './components/word-meaning/word-meaning.component';
import { WordRoutingModule } from './word-routing.module';
import { BrowseComponent } from './pages/browse/browse.component';
import { WordDetailComponent } from './pages/word-detail/word-detail.component';
import { MapDefinitionPipe } from './pipes/map-definition.pipe';

@NgModule({
  declarations: [
    BrowseComponent,
    WordHeadingComponent,
    WordMeaningComponent,
    WordDetailComponent,
    MapDefinitionPipe,
  ],
  imports: [CommonModule, ShareModule, WordRoutingModule],
  exports: [WordRoutingModule],
})
export class WordModule {}
