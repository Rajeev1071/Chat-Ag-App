import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor()  {

}
headers = ["Name", "Coins"];

data = [{
  "Name": "as",
  "Coins": 23
}, {
  "Name": "aww",
  "Coins": 21
}]
}




