import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrotherService {
  message: Subject<string> = new Subject<string>();

  setMessage(message: string){
    this.message.next(message);
  }

  getMessage() {
    return this.message.asObservable();
  }
}
