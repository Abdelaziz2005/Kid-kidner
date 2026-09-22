import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUp } from './sign-up';

describe('SignUp', () => {
  let component: SignUp;
  let fixture: ComponentFixture<SignUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUp],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject invalid email format', () => {
    component.name = 'Test User';
    component.age = 25;
    component.email = 'bad-email';
    component.password = '12345678';

    component.onSubmit();

    expect(component.error_m).toBe('Please enter a valid email address.');
  });

  it('should reject passwords shorter than 8 characters', () => {
    component.name = 'Test User';
    component.age = 25;
    component.email = 'test@example.com';
    component.password = 'short';

    component.onSubmit();

    expect(component.error_m).toBe('Password must be at least 8 characters long.');
  });
});
