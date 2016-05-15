import {Page, NavController,SqlStorage,Storage,Alert} from 'ionic-angular';
import {ElementRef} from 'angular2/core';
import PouchDB from 'pouchdb/dist/pouchdb';
import VMasker from 'vanilla-masker/lib/vanilla-masker';
import {Grupo} from '../../providers/grupo/grupo';
import {GrupoModel} from '../../models/grupo-model';

@Page({
  templateUrl: 'build/pages/add-aluno/add-aluno.html',
})
export class AddAlunoPage {
  static get parameters() {
    return [[NavController], [ElementRef], [Grupo]];
  }

  constructor(nav, el, GrupoService) {
    this.nav = nav;
    this.el = el;

    this.aluno = {
      nome:"",
      telefone:"",
      nascimento:"",
      peso:"",
      altura:"",
      objetivo:""
    };

    this.GrupoService = GrupoService;

    this.GrupoService.getAll().subscribe((data) => {
      this.grupos = [];
      data.forEach((item) =>{
        if(item.nome.length > 0){
          this.grupos.push(item);
        }
      });
    });

  }

  ngOnInit(){
    function inputHandler(masks, max, event) {
      var c = event.target;
      var v = c.value.replace(/\D/g, '');
      var m = c.value.length > max ? 1 : 0;
      VMasker(c).unMask();
      VMasker(c).maskPattern(masks[m]);
      c.value = VMasker.toPattern(v, masks[m]);
    }

    VMasker(this.el.nativeElement.querySelector('.birthday input')).maskPattern('99/99/9999');
    VMasker(this.el.nativeElement.querySelector('.phone input')).maskPattern('(99) 9999-99999');
    VMasker(this.el.nativeElement.querySelector('.height input')).maskPattern('9,99');

    let docMask = ['99,99', '999,99'];
    let doc = this.el.nativeElement.querySelector('.weight input');
    VMasker(doc).maskPattern(docMask[0]);
    doc.addEventListener('input', inputHandler.bind(undefined, docMask, 5), false);
  }

  onGrupoChange(aluno){
    let grupoIndex = this.GrupoService._findIndex(this.grupos,aluno.grupoIndex);
    aluno.grupo = this.grupos[grupoIndex];

  }

  isGroup(grupo){
    if(grupo != undefined){
      console.log(grupo.nome);
      return grupo.nome.length > 0;
    }

    return false;
  }

  add(aluno){
    for(var atr in aluno){
      if((aluno[atr] == undefined || aluno[atr].length == 0) && window.cordova && atr != "grupo"){
        navigator.notification.alert(
            'Há campos vazios, por favor preencha-os.',  // message
            function(){},         // callback
            'Atenção',            // title
            'ok'                  // buttonName
        );
        return;
      }else if((aluno[atr] == undefined || aluno[atr].length == 0) && !window.cordova && atr != "grupo"){
        alert("preencha os campos!");
        return;
      }

    }

    let createNew = aluno.groupIndex == -1 || aluno.grupoIndex == "-1" || aluno.grupo == undefined ? true : false;
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

    let alunoModel = {
      id:id,
      nome:aluno.nome,
      telefone:aluno.telefone,
      nascimento:aluno.nascimento,
      peso:aluno.peso,
      altura:aluno.altura,
      objetivo:aluno.objetivo
    };

    let grupo = createNew ? new GrupoModel() : this.grupos[this.GrupoService._findIndex(this.grupos,aluno.grupoIndex)];
    grupo.alunos.push(alunoModel);

    this.GrupoService.add(grupo).subscribe(() => {
      window.fabric && window.fabric.Answers.sendCustomEvent("newAluno", alunoModel);
      this.nav.pop();
    });

  }

}
