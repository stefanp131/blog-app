import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../_models/post';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'sample',
  templateUrl: 'sample.component.html',
  styleUrls: ['sample.component.scss'],
})
export class SampleComponent implements OnInit {
  serviceUrl = environment.apiUrl + 'posts';
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.httpClient
      .get<Post[]>(this.serviceUrl)
      .subscribe(() => { next: console.log('succes') });
  }
}
