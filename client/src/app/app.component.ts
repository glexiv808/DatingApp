import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { error, log } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating app';
  users: any;

  constructor(private http: HttpClient) {}
  ngOnInit()  {
    this.getUsers();
  }
  getUsers(){
    this.http.get('https://localhost:7021/api/user').subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    })

  }

}
