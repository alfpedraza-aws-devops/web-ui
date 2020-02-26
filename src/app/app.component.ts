import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http:HttpClient) { } 

  angularHost = environment.hostName;
  messages = ['angular'];

  public getMessage() {
    let url = environment.springBootUrl;
    this.http.get<Message>(url)
    .subscribe((data: Message) => {
      let location = environment.hostName;
      let now = new Date();
      let angularMessage = "Angular says Hi! from " + location + " at " + now;
      this.messages = [angularMessage, data.Message2, data.Message1];
    });
  }
}

export interface Message {
  Message1: string;
  Message2: string;
};
