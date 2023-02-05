import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { SearchQuery } from '../../../core/models/query';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  inputValue = '';
  isError = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setWord();
  }

  setWord(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.inputValue = data.state.root.firstChild?.params['word'] || '';
      }
    });
  }

  onInputChange({ value }: { value: string }): void {
    this.inputValue = value;
  }

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
