import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject invalid email format', () => {
    component.email = 'not-an-email';
    component.password = '12345678';

    component.onSubmit();

    expect(component.error_m).toBe('Please enter a valid email address.');
  });

  it('should reject passwords shorter than 8 characters', () => {
    component.email = 'user@example.com';
    component.password = '1234567';

    component.onSubmit();

    expect(component.error_m).toBe('Password must be at least 8 characters long.');
  });
});
