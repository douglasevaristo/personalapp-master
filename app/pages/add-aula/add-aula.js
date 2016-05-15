import {Page, NavController} from 'ionic-angular';
import {Grupo} from '../../providers/grupo/grupo';
import {DatePicker} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/add-aula/add-aula.html'
})
export class AddAulaPage {
  static get parameters() {
    return [[NavController],[Grupo]];
  }

  constructor(nav,GrupoService) {
    this.nav = nav;
    this.GrupoService = GrupoService;

    this.GrupoService.getAll().subscribe((data) => {
      // this.grupos = data;
      this.grupos = [];
      this.alunos = [];
      data.forEach((item) => {
        if(item.nome.length > 0){
          this.grupos.push(item);
        }else{
          this.alunos.push(item);
        }
      });

    });

    this.view = "aluno";

    this.aula = {
      alunoId:{value:-1,required:true},
      grupoId:{value: -1,required:true},
      dia:{value:"Segunda",required:true},
      hora_inicio:{value:"",required:true},
      hora_fim:{value:"",required:true},
      preco_aula:{value:"",required:true},
      preco_hora:{value:"",required:true}
    };
    this.dias_semana = [
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
      'Domingo'
    ];
    this.dia = this.dias_semana[0];
  }


  onSegmentChanged(event){
    this.view = event.value;
  }

  getHour(str){
    DatePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme : 4,
      is24Hour:true
    },(date) => {
      if(str == 'inicio'){
        this.aula.hora_inicio = date.getHours()+":"+date.getMinutes();
      }else{
        this.aula.hora_fim = date.getHours()+":"+date.getMinutes();
      }
    },
    (err) =>{
      console.log(err);
    });
  }

  change(aula){
    let alunoIndex = this.GrupoService._findIndex(this.alunos,aula.alunoId.value);
    this.aluno = this.alunos[alunoIndex];
  }

  changeGrupo(aula){
    let grupoIndex = this.GrupoService._findIndex(this.grupos,aula.grupoId.value);
    this.grupo = this.grupos[grupoIndex];
  }

  add(aula){
    for(var atr in aula){
      let isRequired = aula[atr].required != undefined ? true : false;
      if(isRequired){
        if((aula[atr].value == undefined || aula[atr].value.length == 0) && window.cordova){
          navigator.notification.alert(
              'Há campos vazios, por favor preencha-os.',  // message
              function(){},         // callback
              'Atenção',            // title
              'ok'                  // buttonName
          );
          return;
        }else if((aula[atr].value == undefined || aula[atr].value.length == 0) && !window.cordova){
          alert("Por favor, preencha os campos vazios.");
          return;
        }
      }
    }

    let date = new Date();
    let components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];

    let id = components.join("");

    let newAula = {
      id:id,
      hora_inicio:aula.hora_inicio.value,
      hora_fim:aula.hora_fim.value,
      dia:aula.dia.value,
      preco_aula:aula.preco_aula.value,
      preco_hora:aula.preco_hora.value
    };


    if(this.view == 'aluno'){
      this.grupo = null;
      this.change(aula);
      this.aluno.horarios.push(newAula);
      this.GrupoService.update(this.aluno).subscribe((data) => {
        window.fabric && window.fabric.Answers.sendCustomEvent("newAula", newAula);
        this.nav.pop();
      });
    }else{
      this.aluno = null;
      this.changeGrupo(aula);
      this.grupo.horarios.push(newAula);
      this.GrupoService.update(this.grupo).subscribe((data) => {
        window.fabric && window.fabric.Answers.sendCustomEvent("newAula", newAula);
        this.nav.pop();
      });
    }

  }


}
