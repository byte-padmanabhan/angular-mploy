import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-records-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './records-table.html',
  styleUrls: ['./records-table.css'],
})
export class RecordsTableComponent {
  @Input() records: any[] = [];

  @Input() isLoading = true;
}
