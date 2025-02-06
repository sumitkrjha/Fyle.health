import { TestBed } from '@angular/core/testing';
import { UserdataService } from './userdata.service';

describe('UserdataService', () => {
  let service: UserdataService;
  let getItemSpy: jasmine.Spy;
  let setItemSpy: jasmine.Spy;

  beforeEach(() => {
    // Create spies for localStorage methods
    getItemSpy = spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'userData') {
        return JSON.stringify([
          {
            id: 1,
            name: 'John Doe',
            workouts: [{ type: 'Running', minutes: 30 }],
          },
        ]);
      }
      return null;
    });

    setItemSpy = spyOn(localStorage, 'setItem').and.callFake(() => {});

    TestBed.configureTestingModule({});
    service = TestBed.inject(UserdataService);
  });

  afterEach(() => {
    // Restore spies after each test to prevent errors
    getItemSpy.calls.reset();
    setItemSpy.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize users from localStorage', () => {
    const users = service.getUser();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should save to localStorage and update users', () => {
    const newUser = {
      name: 'Jane Smith',
      workoutType: 'Swimming',
      minutes: 60,
    };

    service.addUser(newUser);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'userData',
      JSON.stringify([
        {
          id: 1,
          name: 'John Doe',
          workouts: [{ type: 'Running', minutes: 30 }],
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [{ type: 'Swimming', minutes: 60 }],
        },
      ])
    );

    expect(service.getUser().length).toBe(2);
  });

  it('should add a new workout to an existing user', () => {
    const newUser = { name: 'John Doe', workoutType: 'Yoga', minutes: 45 };
    service.addUser(newUser);

    const users = service.getUser();
    const updatedUser = users.find((user) => user.name === 'John Doe');
    expect(updatedUser?.workouts.length).toBe(2);
    expect(updatedUser?.workouts[1].type).toBe('Yoga');
  });

  it('should add a new user if not existing', () => {
    const newUser = { name: 'Mike Tyson', workoutType: 'Yoga', minutes: 60 };
    service.addUser(newUser);

    const users = service.getUser();
    const addedUser = users.find((user) => user.name === 'Mike Tyson');
    expect(addedUser).toBeTruthy();
    expect(addedUser?.workouts.length).toBe(1);
  });

  it('should initialize users in localStorage if not already present', () => {
    // Reset getItem mock to simulate absence of userData
    getItemSpy.and.callFake(() => null);

    // Call the initializeUsers function
    service['initializeUsers']();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'userData',
      JSON.stringify(service['userData'])
    );
  });
});
