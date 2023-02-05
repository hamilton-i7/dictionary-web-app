import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { WordMeaningComponent } from './word-meaning.component';

describe('WordMeaningComponent', () => {
  let component: WordMeaningComponent;
  let fixture: ComponentFixture<WordMeaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordMeaningComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WordMeaningComponent);
    component = fixture.componentInstance;

    component.partOfSpeech = 'noun';
    component.synonyms = ['telephone', 'mobile', 'cell'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display #partOfSpeech in lowercase', () => {
    const titleDe = fixture.debugElement.query(
      By.css('.part-of-speech__title')
    );
    const titleEl: HTMLHeadingElement = titleDe.nativeElement;
    const expectedWord = component.partOfSpeech.toLowerCase();

    expect(titleEl.textContent)
      .withContext('should display provided #partOfSpeech in lowercase')
      .toContain(expectedWord);
  });

  it("should compose synonym link using the synonym's name", () => {
    const synonymLinkDe = fixture.debugElement.queryAll(
      By.css('.synonyms__list-item-link')
    );
    synonymLinkDe.forEach((debugEl) => {
      const synonymLinkEl: HTMLAnchorElement = debugEl.nativeElement;

      expect(component.synonyms.includes(synonymLinkEl.textContent || ''))
        .withContext('should exist in synonyms array')
        .toBeTrue();
      expect(synonymLinkEl.href)
        .withContext('should be dynamically composed using the synonym')
        .toContain(`/browse/${synonymLinkEl.textContent}`);
    });
  });
});
