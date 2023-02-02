import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-word-heading',
  templateUrl: './word-heading.component.html',
  styleUrls: ['./word-heading.component.scss'],
})
export class WordHeadingComponent {
  @Input() word?: string;
  @Input() phonetic?: string;
  @Input() audioSrc?: string;

  isError = false;
  audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  playAudio() {
    if (!this.audio.paused || !this.audioSrc) return;

    this.audio.src = this.audioSrc;
    this.audio.play();
  }
}
