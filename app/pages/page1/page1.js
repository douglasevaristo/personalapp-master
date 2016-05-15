import {Page,NavController} from 'ionic-angular';
import {Grupo} from '../../providers/grupo/grupo';
import {ChartComponent} from '../../components/chart/chart';
import {NgZone} from 'angular2/core';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  directives:[ChartComponent]
})
export class Page1 {
  static get parameters() {
    return [[NavController],[Grupo],[NgZone]];
  }

  constructor(nav,GrupoService,zone){
    this.nav = nav;
    this.zone = zone;
    this.GrupoService = GrupoService;

    let date = new Date();
    this.mes = date.getMonth() + 1;
    this.ano = date.getYear() + 1900;
  }

  onPageWillEnter(){
    this.calculando = true;
    setTimeout(() =>{
      this.zone.run(() => {
        this.GrupoService.getAll().subscribe((grupos) => {
          console.log(grupos);
          this.totalRecebido = 0;
          this.totalEsperado = 0;
          grupos.forEach((grupo) => {
            grupo.aulas.forEach((aula) => {
              if(parseInt(aula.valor)){
                this.totalRecebido = aula.data_pagamento != null ? this.totalRecebido + parseInt(aula.valor) : this.totalRecebido;
                this.totalEsperado = aula.realizada == true ? this.totalEsperado + parseInt(aula.valor) : this.totalEsperado;
              }
            });
          });
          this.calculando = false;
        });
      });
    },50);
  }
}
