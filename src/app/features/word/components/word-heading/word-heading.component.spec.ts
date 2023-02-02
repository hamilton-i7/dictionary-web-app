import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordHeadingComponent } from './word-heading.component';

describe('WordHeadingComponent', () => {
  let component: WordHeadingComponent;
  let fixture: ComponentFixture<WordHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordHeadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
