import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchQuery } from '../../../../core/models/query';

@Component({
  selector: 'app-word-heading',
  templateUrl: './word-heading.component.html',
  styleUrls: ['./word-heading.component.scss'],
})
export class WordHeadingComponent {
  @Input() word?: string;
  @Input() phonetic?: string;
  @Input() audioSrc?: string;
  @Output() search = new EventEmitter<SearchQuery>();

  isError = false;
  audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  onSearch({ query }: SearchQuery) {
    const formattedWord = query.trim();

    this.isError = formattedWord.length === 0;
    this.search.emit({ query: formattedWord });
  }

  playAudio() {
    if (!this.audio.paused || !this.audioSrc) return;

    this.audio.src = this.audioSrc;
    this.audio.play();
  }
}
