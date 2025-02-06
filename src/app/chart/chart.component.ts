import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { UserdataService } from '../userdata.service';
import { userType } from '../user-type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule, FormsModule],
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {
  users: userType[] = [];
  selectedUserId: string = '  ';
  chartData: any = {};
  chartOptions: any;

  constructor(private userService: UserdataService) {}

  ngOnInit(): void {
    // Get users from service
    this.userService.users$.subscribe((users) => {
      this.users = users;
      if (users.length > 0) {
        this.selectedUserId = users[0].name; // Default to first user
        this.updateChartData(); // Initialize chart data with first user
      }
    });

    // Chart options (UI configurations)
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: true },
      },
    };
  }

  // Update chart data based on selected user
  updateChartData() {
    console.log('selectedId', this.selectedUserId);
    const selectedUser = this.users.find(
      (user) => user.name === this.selectedUserId
    );
    console.log('selectedUser', selectedUser);
    // if (!selectedUser) return;

    // Extract workout data
    const labels = selectedUser?.workouts.map((w) => w.type);
    const data = selectedUser?.workouts.map((w) => w.minutes);

    // Chart data configuration
    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: `Workout Duration (minutes)`,
          data: data,
          backgroundColor: ['#ff3366'],
          borderColor: '#000',
          borderWidth: 1,
        },
      ],
    };
  }
}
