import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { DisplayUser } from '../display-user';
import { workoutType } from '../user-type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [FormsModule],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  users: DisplayUser[] = [];
  searchTerm: string = '';
  selectedWorkoutType: string = '';
  filteredUsers: DisplayUser[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private UserdataService: UserdataService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.UserdataService.users$.subscribe((users: any[]) => {
      this.users = users.map((user) => ({
        id: user.id,
        name: user.name,
        workouts: user.workouts.map((workout: workoutType) => workout.type), // ✅ Store as an array
        workoutCount: user.workouts.length,
        totalMinutes: user.workouts.reduce(
          (sum: number, workout: workoutType) => sum + workout.minutes,
          0
        ),
      }));
      this.filteredUsers = [...this.users]; // ✅ Now `users` is populated before copying
      this.updatePagination();
    });
  }

  getFilteredUsers() {
    let filtered = [...this.users]; // Ensure fresh filtering

    // Search by username
    if (this.searchTerm.trim()) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by workout type
    if (this.selectedWorkoutType) {
      filtered = filtered.filter((user) =>
        user.workouts.includes(this.selectedWorkoutType)
      );
    }

    this.filteredUsers = filtered; // ✅ Update filtered list
    this.updatePagination();
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedWorkoutType = '';
    this.filteredUsers = [...this.users]; // ✅ Reset properly
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.max(
      1,
      Math.ceil(this.filteredUsers.length / this.itemsPerPage)
    );
    this.currentPage = Math.min(this.currentPage, this.totalPages);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  getPaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
