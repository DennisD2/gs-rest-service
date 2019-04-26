import { Component } from '@angular/core';

import { HelloService } from './services/hello.service';
import { HelloResponse} from "./model/HelloResponse";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String = 'Hello World with REST call';
  service_result: String = '(not yet called)';
  srv_result: HelloResponse;
  srv_results: HelloResponse[];

  constructor(protected helloService: HelloService) {
   const self = this;
   self.srv_result = Object.assign({}, { 'id':1, content:'no content' });

   helloService.getHello('Dennis').subscribe( echo => {
      self.service_result = echo;
    });

    /*helloService.getHello('Dennis').subscribe( echo => {
      self.srv_result = JSON.parse(echo);
      console.log('Result from call: ' + self.srv_result);
      console.log('Result part: ' + self.srv_result.content);
      console.log('Result part: ' + self.srv_result.id);
     });*/

    helloService.getHello3('Dennis').subscribe( echo => {
      console.log('Result from call: ' + echo);
      //self.srv_result = Object.assign({}, echo);
      self.srv_result = echo;
      console.log('Result part: ' + self.srv_result.content);
      console.log('Result part: ' + self.srv_result.id);
    });

    helloService.getHellos('Dennis').subscribe( echo => {
      console.log('Result from call: ' + echo);
      self.srv_results = echo;
    });
  }
}
