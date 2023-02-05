import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { HeaderComponent } from './header.component';
import { SearchQuery } from '../../../core/models/query';

@Component({ selector: 'app-top-bar', template: '' })
class TopBarStubComponent {}

@Component({ selector: 'app-search-input', template: '' })
class SearchInputStubComponent {
  @Input() value = '';
  @Output() valueChange = new EventEmitter();
  @Input() error = false;
  @Output() enterPress = new EventEmitter<SearchQuery>();
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        TopBarStubComponent,
        SearchInputStubComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
