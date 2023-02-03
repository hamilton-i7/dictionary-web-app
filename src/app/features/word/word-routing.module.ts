import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './pages/browse/browse.component';
import { WordDetailComponent } from './pages/word-detail/word-detail.component';

const routes: Routes = [
  { path: 'browse', component: BrowseComponent },
  { path: 'browse/:word', component: WordDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class WordRoutingModule {}
