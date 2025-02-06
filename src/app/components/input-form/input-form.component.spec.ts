import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputFormComponent } from './input-form.component';
import { UserdataService } from '../userdata.service';
import { of } from 'rxjs';

describe('InputFormComponent', () => {
  let component: InputFormComponent;
  let fixture: ComponentFixture<InputFormComponent>;
  let userdataServiceMock: jasmine.SpyObj<UserdataService>;

  beforeEach(async () => {
    // Create a spy object for the UserdataService
    userdataServiceMock = jasmine.createSpyObj('UserdataService', ['addUser']);

    // Configure the testing module
    await TestBed.configureTestingModule({
      imports: [FormsModule, InputFormComponent], // Import InputFormComponent here
      providers: [
        { provide: UserdataService, useValue: userdataServiceMock }, // Use the spy instead of the real service
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addUser and reset the form on valid submission', () => {
    // Arrange: Set valid form data
    component.username = 'Jane Smith';
    component.workoutType = 'Running';
    component.workoutDuration = 30;

    // Act: Call the saveUser method
    component.saveUser();

    // Assert: Check that addUser was called with correct data
    expect(userdataServiceMock.addUser).toHaveBeenCalledWith({
      name: 'Jane Smith',
      workoutType: 'Running',
      minutes: 30,
    });

    // Assert: Check if the form is reset
    expect(component.username).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutDuration).toBeNull();
  });

  it('should not call addUser if form is invalid', () => {
    // Arrange: Set invalid form data
    component.username = '';
    component.workoutType = '';
    component.workoutDuration = null;

    // Act: Call the saveUser method
    component.saveUser();

    // Assert: Ensure addUser is not called
    expect(userdataServiceMock.addUser).not.toHaveBeenCalled();
  });

  it('should show an alert when form is invalid', () => {
    spyOn(window, 'alert'); // Spy on the alert function

    // Arrange: Set invalid form data
    component.username = '';
    component.workoutType = '';
    component.workoutDuration = null;

    // Act: Call the saveUser method
    component.saveUser();

    // Assert: Check if alert was called
    expect(window.alert).toHaveBeenCalledWith('Please fill all fields');
  });

  it('should reset the form after invalid submission attempt', () => {
    // Arrange: Set invalid form data
    component.username = '';
    component.workoutType = '';
    component.workoutDuration = null;

    // Act: Call the saveUser method
    component.saveUser();

    // Assert: Ensure that form values are reset after invalid attempt
    expect(component.username).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutDuration).toBeNull();
  });

  it('should reset the form after valid submission', () => {
    // Arrange: Set valid form data
    component.username = 'John Doe';
    component.workoutType = 'Cycling';
    component.workoutDuration = 45;

    // Act: Call the saveUser method
    component.saveUser();

    // Assert: Check if the form is reset after valid submission
    expect(component.username).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutDuration).toBeNull();
  });
});
