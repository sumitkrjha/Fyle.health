import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { UserdataService } from '../userdata.service';
import { of } from 'rxjs';
import { DisplayUser } from '../display-user';
import { FormsModule } from '@angular/forms';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let userDataServiceMock: any;

  const mockUsers: DisplayUser[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: 'Running, Cycling',
      workoutCount: 2,
      totalMinutes: 120,
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: 'Swimming',
      workoutCount: 1,
      totalMinutes: 60,
    },
  ];

  beforeEach(async () => {
    userDataServiceMock = {
      users$: of(mockUsers),
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, TableComponent],
      providers: [{ provide: UserdataService, useValue: userDataServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter users by search term', () => {
    component.users = mockUsers;
    component.searchTerm = 'John';
    component.getFilteredUsers();
    expect(component.filteredUsers).toEqual([mockUsers[0]]);
  });

  it('should filter users by workout type', () => {
    component.users = mockUsers;
    component.selectedWorkoutType = 'Swimming';
    component.getFilteredUsers();
    expect(component.filteredUsers).toEqual([mockUsers[1]]);
  });

  it('should reset filters', () => {
    component.users = mockUsers;
    component.searchTerm = 'John';
    component.selectedWorkoutType = 'Running';
    component.resetFilters();
    expect(component.searchTerm).toEqual('');
    expect(component.selectedWorkoutType).toEqual('');
    expect(component.filteredUsers).toEqual(mockUsers);
  });

  it('should update pagination', () => {
    component.filteredUsers = mockUsers;
    component.itemsPerPage = 1;
    component.updatePagination();
    expect(component.totalPages).toEqual(2);
    expect(component.currentPage).toEqual(1);
  });

  it('should navigate to the previous page', () => {
    component.currentPage = 2;
    component.previousPage();
    expect(component.currentPage).toEqual(1);
  });

  it('should not navigate to the previous page if already on the first page', () => {
    component.currentPage = 1;
    component.previousPage();
    expect(component.currentPage).toEqual(1);
  });

  it('should navigate to the next page', () => {
    component.currentPage = 1;
    component.totalPages = 2;
    component.nextPage();
    expect(component.currentPage).toEqual(2);
  });

  it('should not navigate to the next page if already on the last page', () => {
    component.currentPage = 2;
    component.totalPages = 2;
    component.nextPage();
    expect(component.currentPage).toEqual(2);
  });

  it('should change items per page and reset current page', () => {
    component.itemsPerPage = 2;
    component.onItemsPerPageChange();
    expect(component.currentPage).toEqual(1);
    expect(component.totalPages).toEqual(1);
  });

  it('should get paginated users', () => {
    component.filteredUsers = mockUsers;
    component.itemsPerPage = 1;
    component.currentPage = 2;
    const paginatedUsers = component.getPaginatedUsers();
    expect(paginatedUsers).toEqual([mockUsers[1]]); // Expect the second user
  });
});
