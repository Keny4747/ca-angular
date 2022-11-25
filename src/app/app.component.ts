import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  screen = "";
  a: any;
  b: any;
  c: any;
  d = "";
  e: "";

  conteneder:any;
  arrayOperaciones:any=[];
  arrayResultado:any=[];
  verOperaciones:any=[];
  mostrarStorage:any;
  buttonHistory:any;
  btnActive="text-right";
  calculadoraPos:any;
  historyPos:any;
  estiloPos1:string;
  estiloPos2:string;

  constructor(private renderer:Renderer2){

  }

@ViewChild('mostrarOperciones',{static:true}) mostrarOperaciones!:ElementRef;



  ngOnInit(): void {

  }

  //Calculadora

  enterValue(value: string) {

    if ((this.b == "+") || (this.b == "-") || (this.b == "*") || (this.b == "/")) {
      this.d = this.d + value;
      this.screen = this.screen + value;
      this.c = this.d;


    } else {

      this.screen = this.screen + value;
      this.a = this.screen;


    }

  }

  condition(value: string) {
    this.screen = this.screen + value;
    this.b = value;
  }

  clear() {
    this.screen = "";
    this.a = "";
    this.b = "";
    this.c = "";
    this.d = "";

  }
  result() {

    switch (this.b) {

      case '+':
        this.screen = `${this.screen}= ${(parseInt(this.a) + parseInt(this.c)).toString()} `;
        this.screen = (parseInt(this.screen) + parseInt(this.c)).toString();
        break;

      case '-':
        this.screen = `${this.screen}= ${(parseInt(this.a) - parseInt(this.c)).toString()} `;
        this.screen = (parseInt(this.screen) - parseInt(this.c)).toString();
        break;

      case '*':
        this.screen = `${this.screen}= ${(parseInt(this.a) * parseInt(this.c)).toString()} `;
        this.screen = (parseInt(this.screen) * parseInt(this.c)).toString();
        
        break;

      default:
        this.screen = `${this.screen}= ${(parseInt(this.a) / parseInt(this.c)).toString()} `;
        this.screen = (parseInt(this.screen) / parseInt(this.c)).toString();
        break;

    }

    this.clear();
  }

  //Se crea de fomra dinámica el history mediante el DOM

  crearHtml(operacion:string,resultado:string){
    const mostrar = {
      operacion,
      resultado
    }

    var containerCard = document.createElement('div');
    var verOperacion = document.createElement('p');
    var verResultado = document.createElement('p');

    containerCard.classList.add('conatienrCard');
    verOperacion.classList.add('operation');
    verResultado.classList.add('resultOperation');

    containerCard.appendChild(verOperacion);
    containerCard.appendChild(verResultado);
   
    this.renderer.appendChild(this.mostrarOperaciones.nativeElement, containerCard);

    this.conteneder = containerCard;

    this.arrayOperaciones = [...this.arrayOperaciones, mostrar];
  }
  
}
