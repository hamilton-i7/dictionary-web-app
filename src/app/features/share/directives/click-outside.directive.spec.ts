import { ClickOutsideDirective } from './click-outside.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { click } from '../../../core/utils/events';

@Component({
  template: `
    <button
      class="inside"
      appClickOutside
      (clickOutside)="clickOutside()"
    ></button>
    <button class="outside"></button>
  `,
})
class TestComponent {
  clickOutside(): void {
    return;
  }
}

describe('ClickOutsideDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClickOutsideDirective, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger click inside', () => {
    spyOn(component, 'clickOutside');

    const insideDe = fixture.debugElement.query(By.css('.inside'));
    const insideEl: HTMLButtonElement = insideDe.nativeElement;

    click(insideEl);
    expect(component.clickOutside).not.toHaveBeenCalled();
  });

  it('should trigger click outside', () => {
    spyOn(component, 'clickOutside');

    const outsideDe = fixture.debugElement.query(By.css('.outside'));
    const outsideEl: HTMLButtonElement = outsideDe.nativeElement;

    click(outsideEl);
    expect(component.clickOutside).toHaveBeenCalled();
  });
});
