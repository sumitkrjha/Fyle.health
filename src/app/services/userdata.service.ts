import { Injectable } from '@angular/core';
import { userType } from '../interfaces/user-type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  private STORAGE_KEY = 'userData';
  private usersSubject = new BehaviorSubject<any[]>(
    this.getUserFromLocalStorage()
  );
  users$ = this.usersSubject.asObservable();

  private userData: userType[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 },
      ],
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 },
      ],
    },
  ];
  constructor() {
    this.initializeUsers();
  }

  private initializeUsers() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.userData));
    }
  }

  getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  saveToLocalStorage(data: userType[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    this.usersSubject.next(data);
  }

  getUser() {
    return this.usersSubject.value;
  }

  addUser(newUser: any) {
    let users = this.getUserFromLocalStorage();
    let existingUser = users.find((user: any) => user.name === newUser.name);
    if (existingUser) {
      existingUser.workouts.push({
        type: newUser.workoutType,
        minutes: newUser.minutes,
      });
    } else {
      users.push({
        id: users.length + 1,
        name: newUser.name,
        workouts: [{ type: newUser.workoutType, minutes: newUser.minutes }],
      });
    }

    this.saveToLocalStorage(users);
  }
}
