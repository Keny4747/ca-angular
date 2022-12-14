import { JsonPipe } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';


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
  e= "";

  conteneder: any;
  arrayOperaciones: any = [];
  arrayResultado: any = [];
  verOperaciones: any = [];
  mostrarStorage: any;
  buttonHistory: any;
  btnActive = "text-right";
  calculadoraPos: any;
  historyPos: any;
  estiloPos1: string;
  estiloPos2: string;

  constructor(private renderer: Renderer2) {

  }

  @ViewChild('mostrarOperciones', { static: true }) mostrarOperaciones!: ElementRef;



  ngOnInit(): void {

    //Posicion del history inicial
    this.buttonHistory=true;
    this.btnActive='text-right';

    //verificacion de las variables del localStorage
    this.verOperaciones = localStorage.getItem('operaciones')||[];

    //Se crea el elemento del history con las variables del storage

    this.crearHtmlStorage();

    
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
    var operacion;
    var resultado;
    switch (this.b) {

      case '+':
        this.screen = `${this.screen}= ${(parseInt(this.a) + parseInt(this.c)).toString()} `;
        this.screen = (parseInt(this.screen) + parseInt(this.c)).toString();

        //Cargar el history
        operacion = `${this.a}${this.b}${this.c}`;
        resultado = this.screen;

        this.crearHtml(operacion, resultado);
        break;

      case '-':
        this.screen = `${this.screen}= ${(parseInt(this.a) - parseInt(this.c)).toString()} `;
        this.screen = (parseInt(this.screen) - parseInt(this.c)).toString();

        //Cargar el history
        operacion = `${this.a}${this.b}${this.c}`;
        resultado = this.screen;

        this.crearHtml(operacion, resultado);


        break;

      case '*':
        this.screen = `${this.screen}= ${(parseInt(this.a) * parseInt(this.c)).toString()} `;
        this.screen = (parseInt(this.screen) * parseInt(this.c)).toString();

        //Cargar el history
        operacion = `${this.a}${this.b}${this.c}`;
        resultado = this.screen;

        this.crearHtml(operacion, resultado);

        break;

      default:
        this.screen = `${this.screen}= ${(parseInt(this.a) / parseInt(this.c)).toString()} `;
        this.screen = (parseInt(this.screen) / parseInt(this.c)).toString();

        //Cargar el history
        operacion = `${this.a}${this.b}${this.c}`;
        resultado = this.screen;

        this.crearHtml(operacion, resultado);
        break;

    }

    this.clear();
  }

  //Se crea de fomra din??mica el history mediante el DOM

  crearHtml(operacion: string, resultado: string) {
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

    this.arrayOperaciones.forEach((element: any) => {

      this.conteneder.querySelector('.operation').innerText = element.operacion;
      this.conteneder.querySelector('.resultOperation').innerText = element.resultado;

    })

    this.sincronizarStorage();

  };

  sincronizarStorage(){
    localStorage.setItem('operaciones', JSON.stringify(this.arrayOperaciones));
  }

  crearHtmlStorage(){
    if(this.verOperaciones.length>0){
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

      this.arrayResultado = JSON.parse(this.verOperaciones);

      this.arrayResultado.forEach((element:any)=>{
        this.crearHtml(element.operacion,element.resultado);
      });
    }
  }

  limpiar(){
    
    if(this.arrayOperaciones.length>0){
      Swal.fire({
        icon:'question',
        title:'??Desea limpiar el historial?',
        showCancelButton:true,
        confirmButtonColor:'#3005d6',
        confirmButtonText:'Aceptar',
        allowOutsideClick:false
      }
      ).then((result)=>{
        localStorage.removeItem('operaciones');
        Swal.fire({
          icon:'success',
          title:'El historail se limplio correctamente!',
          confirmButtonText:'Aceptar'
        }).then((result)=>{
          if(result.value){
            location.reload();
          }
        })
      })
    }else{
      Swal.fire({
        icon:'info',
        title:'El historial est?? limpio'
      })
    }
  }

  //Cambia la posicion del contenido del history
  cambiarPosicion(){
    
    if(this.buttonHistory){
      this.buttonHistory = false;
      this.btnActive = 'text-left';

    }else{
      this.buttonHistory = true;
      this.btnActive = 'text-right';
    }
  }


  cambiarPosicionDiv(){


    if(this.calculadoraPos && !this.historyPos){
      
      this.calculadoraPos = false;
      this.historyPos=true;
      this.estiloPos1='';
      this.estiloPos2='';
      
    }else{
      this.calculadoraPos=true;
      this.historyPos=false;
      this.estiloPos1=' transform: translate(100%)';
      this.estiloPos2=' transform: translate(100%)';
    }
  }

  
}


