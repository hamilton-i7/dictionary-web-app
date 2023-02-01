import { Component, HostBinding, OnInit } from '@angular/core';
import { Font, FontService } from './font.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Dictionary Web App';
  font?: Font;

  constructor(private fontService: FontService) {}

  ngOnInit(): void {
    this.fontService.font.subscribe((font) => (this.font = font));
  }

  @HostBinding('class') get fontClass(): string {
    switch (this.font) {
      case Font.SERIF:
        return 'serif';
      case Font.MONO:
        return 'mono';
      default:
        return 'sans-serif';
    }
  }
}
