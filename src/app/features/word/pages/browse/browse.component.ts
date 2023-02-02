import { Component } from '@angular/core';
import { SearchQuery } from '../../../../core/models/query';
import { Word } from '../../../../core/models/word';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent {
  isError = false;

  constructor(private router: Router) {}

  goToWord({ query }: SearchQuery): void {
    const formattedQuery = query.trim().toLowerCase();

    if (!this.isValidWord(formattedQuery)) {
      this.isError = true;
      return;
    }
    this.router.navigateByUrl(`/browse/${formattedQuery}`);
  }

  isValidWord(word: string): boolean {
    return word.length > 0;
  }
}
