import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Theme, ThemeService } from '../../services/theme.service';

import { ThemeToggleComponent } from './theme-toggle.component';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let themeServiceStub: Partial<ThemeService>;

  beforeEach(async () => {
    themeServiceStub = {
      theme$: new BehaviorSubject<Theme>('light'),
      changeTheme(theme) {
        this.theme$?.next(theme);
      },
    };
    await TestBed.configureTestingModule({
      declarations: [ThemeToggleComponent],
      providers: [{ provide: ThemeService, useValue: themeServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#changeTheme() should toggle #darkThemeEnabled', () => {
    expect(component.darkThemeEnabled)
      .withContext('disabled at first')
      .toBe(false);

    component.changeTheme();

    expect(component.darkThemeEnabled)
      .withContext('enabled after click')
      .toBe(true);

    component.changeTheme();

    expect(component.darkThemeEnabled)
      .withContext('disabled after second click')
      .toBe(false);
  });
});
