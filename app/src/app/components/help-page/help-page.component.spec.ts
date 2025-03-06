import { TestBed } from '@angular/core/testing';
import { HelpPageComponent } from './help-page.component';
import { MatIconModule } from '@angular/material/icon';

describe('HelpPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [HelpPageComponent],
    }).compileComponents();
  });

  it('should create the help page', () => {
    const fixture = TestBed.createComponent(HelpPageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HelpPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('How to play Math Pyramid');
  });
});
