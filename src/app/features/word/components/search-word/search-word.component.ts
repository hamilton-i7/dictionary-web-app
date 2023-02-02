import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchQuery } from '../../../../core/models/query';

@Component({
  selector: 'app-search-word',
  templateUrl: './search-word.component.html',
  styleUrls: ['./search-word.component.scss'],
})
export class SearchWordComponent {
  @Input() word?: string;
  @Input() phonetic?: string;
  @Input() audioSrc?: string;
  @Output() search = new EventEmitter<SearchQuery>();

  isError = false;

  onSearch({ query }: SearchQuery) {
    const formattedWord = query.trim();

    this.isError = formattedWord.length === 0;
    this.search.emit({ query: formattedWord });
  }
}
