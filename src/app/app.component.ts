import { Component } from '@angular/core';
import { InputFormComponent } from './input-form/input-form.component';
import { TableComponent } from './table/table.component';
import { ChartComponent } from './chart/chart.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, InputFormComponent, TableComponent, ChartComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'fylehealth';
  menuOpen = false; // Controls sidebar visibility

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
