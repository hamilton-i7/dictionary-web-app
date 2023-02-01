import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontMenuComponent } from './font-menu.component';

describe('FontMenuComponent', () => {
  let component: FontMenuComponent;
  let fixture: ComponentFixture<FontMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FontMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FontMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
