import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message when is error', () => {
    component.error = true;
    fixture.detectChanges();

    const errorMsgDe = fixture.debugElement.query(
      By.css('.text-field__error-message')
    );
    const errorMsgEl: HTMLParagraphElement = errorMsgDe.nativeElement;

    expect(errorMsgEl.textContent)
      .withContext('shows error message')
      .toContain("Whoops, can't be empty...");
  });
});
