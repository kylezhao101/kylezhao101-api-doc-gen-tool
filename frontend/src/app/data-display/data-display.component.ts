import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css'
})
export class DataDisplayComponent implements OnInit{
  httpClient = inject(HttpClient);
  data: any = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient
        .get('https://kylezhao101-api.vercel.app/api/all')
        .subscribe((data: any) => {
          console.log(data);
          this.data = data;
        })
  }
}
