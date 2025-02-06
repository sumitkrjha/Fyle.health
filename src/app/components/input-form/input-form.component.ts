import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserdataService } from '../../services/userdata.service';

@Component({
  selector: 'app-input-form',
  imports: [FormsModule],
  templateUrl: './input-form.component.html',
})
export class InputFormComponent {
  // username, workoutType and workoutDuration are to save the form data input by the user
  username: string = '';
  workoutType: string = '';
  workoutDuration: number | null = null;

  constructor(private UserdataService: UserdataService) {}

  saveUser() {
    if (!this.username || !this.workoutType || !this.workoutDuration) {
      alert('Please fill all fields');
      return;
    }

    this.UserdataService.addUser({
      name: this.username,
      workoutType: this.workoutType,
      minutes: this.workoutDuration,
    });
    this.resetForm();
  }
  resetForm() {
    this.username = '';
    this.workoutType = '';
    this.workoutDuration = null;
  }
}
