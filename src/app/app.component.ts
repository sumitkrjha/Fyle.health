import { Component } from '@angular/core';
import { InputFormComponent } from './input-form/input-form.component';
import { TableComponent } from './table/table.component';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-root',
  imports: [InputFormComponent, TableComponent, ChartComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'fylehealth';
}
