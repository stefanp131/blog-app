import { Component, Input, OnInit } from '@angular/core';
import { Commentary } from 'src/app/_models/commentary';

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.scss']
})
export class CommentaryComponent implements OnInit {
  @Input() commentary: Commentary;
  constructor() { }

  ngOnInit(): void {
  }

}
