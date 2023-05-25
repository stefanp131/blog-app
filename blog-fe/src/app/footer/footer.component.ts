import { Component, OnInit } from '@angular/core';
import { BrotherService } from '../_services/brother.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  message: string;

  constructor(private brother: BrotherService) { }

  ngOnInit(): void {
    this.brother.getMessage().subscribe(messageFromHeader => this.message = messageFromHeader);
  }

}
