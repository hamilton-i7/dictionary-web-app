import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Font, FontService } from '../../services/font.service';
import { BehaviorSubject, first } from 'rxjs';

import { FontMenuComponent } from './font-menu.component';
import { By } from '@angular/platform-browser';

@Component({ selector: 'app-text-button', template: '' })
class TextButtonStubComponent {
  @Input() label = '';
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }
}

describe('FontMenuComponent', () => {
  let component: FontMenuComponent;
  let fixture: ComponentFixture<FontMenuComponent>;
  let fontServiceStub: Partial<FontService>;

  beforeEach(async () => {
    fontServiceStub = {
      font$: new BehaviorSubject<Font>(Font.SANS_SERIF),
      changeFont(font) {
        this.font$?.next(font);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [FontMenuComponent, TextButtonStubComponent],
      providers: [{ provide: FontService, useValue: fontServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(FontMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#changeFont() should change #selectedFont to desired font', () => {
    expect(component.selectedFont)
      .withContext("'SANS_SERIF' at first")
      .toBe(Font.SANS_SERIF);

    component.changeFont(Font.MONO);

    expect(component.selectedFont)
      .withContext("'MONO' after selectionm")
      .toBe(Font.MONO);
  });

  it('should open menu with animation class after clicking button', () => {
    const menuDe = fixture.debugElement.query(By.css('.menu'));
    const menuEl: HTMLMenuElement = menuDe.nativeElement;

    expect(menuEl.classList.contains('scale-in-menu'))
      .withContext('should not have animation class')
      .toBe(false);
    component.showMenu$.pipe(first()).subscribe((show) => {
      expect(show).withContext('should be hidden at first').toBe(false);
    });

    component.openMenu();
    fixture.detectChanges();

    expect(menuEl.classList.contains('scale-in-menu'))
      .withContext('should have animation class after opening menu')
      .toBe(true);
    component.showMenu$.pipe(first()).subscribe((show) => {
      expect(show).withContext('should be visible').toBe(true);
    });
  });

  it('#hideMenu() should close menu', () => {
    const menuDe = fixture.debugElement.query(By.css('.menu'));
    const menuEl: HTMLMenuElement = menuDe.nativeElement;

    component.showMenu$.next(true);
    fixture.detectChanges();

    expect(menuEl.classList.contains('scale-in-menu'))
      .withContext('should have animation class')
      .toBe(true);
    component.showMenu$.pipe(first()).subscribe((show) => {
      expect(show).withContext('should be visible at first').toBe(true);
    });

    component.hideMenu();
    fixture.detectChanges();

    expect(menuEl.classList.contains('scale-in-menu'))
      .withContext('should not have animation class after closing menu')
      .toBe(false);
    component.showMenu$.pipe(first()).subscribe((show) => {
      expect(show).withContext('should be hidden').toBe(false);
    });
  });
});
