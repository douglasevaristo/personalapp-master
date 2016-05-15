import {Page,NavController} from 'ionic-angular';
import {Grupo} from '../../providers/grupo/grupo';


@Page({
  templateUrl: 'build/pages/page4/page4.html'
})
export class Page4 {

  static get parameters() {
    return [[NavController],[Grupo]];
  }
  constructor(nav,GrupoService) {
    this.view = "nao-recebidos";
    this.nav = nav;
    this.GrupoService = GrupoService;
    this.GrupoService.getAll().subscribe((data) => {
      this.grupos = data;
    });

    let date = new Date();
    this.mes = date.getMonth() + 1;
    this.ano = date.getYear() + 1900;

    this.arrMeses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

  }

  nextMonth(){
    if(this.mes == 12){
      this.mes = 1
      this.ano++;
    }else{
      this.mes++;
    }
  }

  previousMonth(){
    if(this.mes == 1){
      this.mes = 12;
      this.ano--;
    }else{
      this.mes--;
    }
  }

  confirmar(aula,grupo){
    let date = new Date();
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let ano = date.getYear() + 1900;
    if(dia < 10){
      dia = "0"+dia;
    }

    if(mes < 10){
      mes = "0"+mes;
    }

    let today = dia+"/"+mes+"/"+ano;
    aula.data_pagamento = today;

    this.GrupoService.update(grupo);
  }


  matchType(aula){
    let matchData;
    if(aula.data_pagamento == null){
      matchData = this.mes == parseInt(aula.data_realizada.substring(3,5)) && this.ano == aula.data_realizada.substring(6);
    }else{
      matchData = this.mes == parseInt(aula.data_pagamento.substring(3,5)) && this.ano == aula.data_pagamento.substring(6);
    }
    return matchData && ((this.view == 'recebidos' && aula.data_pagamento != null) || (this.view == 'nao-recebidos' && aula.data_pagamento == null));
  }

  isNaoRecebido(aula){
    return (this.view == 'nao-recebidos' && aula.data_pagamento == null);
  }

  onSegmentChanged(event){
    this.view = event.value;
  }
}
