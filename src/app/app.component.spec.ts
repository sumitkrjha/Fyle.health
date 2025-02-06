import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'fylehealth' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('fylehealth');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      ' Fitness Tracker That You Deserve '
    );
  });

  it('should toggle menuOpen when toggleMenu is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Initially, menuOpen should be false
    expect(app.menuOpen).toBeFalse();

    // Call toggleMenu and check if menuOpen is true
    app.toggleMenu();
    expect(app.menuOpen).toBeTrue();

    // Call toggleMenu again and check if menuOpen is false
    app.toggleMenu();
    expect(app.menuOpen).toBeFalse();
  });
});
