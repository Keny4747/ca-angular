import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  screen = "";
  a:any;
  b:any;
  c:any;
  d="";
  e:"";


  ngOnInit(): void {
    
  }
  
  //Calculadora

  enterValue(value:string){
    
    if ((this.b=="+")||(this.b=="-")||(this.b=="*")||(this.b=="/")) {
      this.d= this.d+ value;
      this.screen = this.screen +value;
      this.c= this.d;

      console.log(this.b, this.c)
    }else{

      this.screen = this.screen + value;
      this.a = this.screen;

      console.log(this.a)
    }

  }

}
