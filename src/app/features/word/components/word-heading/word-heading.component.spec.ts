import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { WordHeadingComponent } from './word-heading.component';

describe('WordHeadingComponent', () => {
  let component: WordHeadingComponent;
  let fixture: ComponentFixture<WordHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordHeadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordHeadingComponent);
    component = fixture.componentInstance;

    component.word = 'Keyboard';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display word in lowercase', () => {
    const titleDe = fixture.debugElement.query(By.css('.word__title'));
    const titleEl: HTMLHeadingElement = titleDe.nativeElement;
    const expectedWord = component.word?.toLowerCase();

    expect(titleEl.textContent)
      .withContext('should display provided word in lowercase')
      .toContain(expectedWord);
  });

  it('should NOT display phonetic when not provided', () => {
    const phoneticDe = fixture.debugElement.query(By.css('.word__phonetic'));
    const phoneticEl = phoneticDe?.nativeElement;

    expect(phoneticEl).withContext('should not render element').toBeFalsy();
  });

  it('should display phonetic when provided', () => {
    component.phonetic = "/'ki:bɔ:d/";
    fixture.detectChanges();

    const phoneticDe = fixture.debugElement.query(By.css('.word__phonetic'));
    const phoneticEl: HTMLParagraphElement = phoneticDe.nativeElement;

    expect(phoneticEl.textContent)
      .withContext('should render element with phonetic')
      .toContain("/'ki:bɔ:d/");
  });

  it('should NOT display play button when audio source URL not provided', () => {
    const playButtonDe = fixture.debugElement.query(
      By.css('.word__play-button')
    );
    const playButtonEl = playButtonDe?.nativeElement;

    expect(playButtonEl).withContext('should not render element').toBeFalsy();
  });

  it('should display play button when audio source URL provided', () => {
    component.audioSrc =
      'https://api.dictionaryapi.dev/media/pronunciations/en/keyboard-us.mp3';
    fixture.detectChanges();

    const playButtonDe = fixture.debugElement.query(
      By.css('.word__play-button')
    );
    const playButtonEl: HTMLButtonElement = playButtonDe.nativeElement;

    expect(playButtonEl).withContext('should render play button').toBeTruthy();
  });

  it('should play audio when clicked', () => {
    component.audioSrc =
      'https://api.dictionaryapi.dev/media/pronunciations/en/keyboard-us.mp3';
    fixture.detectChanges();

    const playButtonDe = fixture.debugElement.query(
      By.css('.word__play-button')
    );
    playButtonDe.triggerEventHandler('click');

    expect(component.audio.paused).toBeFalse();
  });
});
