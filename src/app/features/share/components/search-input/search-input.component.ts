import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchQuery } from '../../../../core/models/query';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  @Input() error = false;
  @Output() valueChange = new EventEmitter<SearchQuery>();

  onSearch(query: string): void {
    this.valueChange.emit({ query });
  }
}