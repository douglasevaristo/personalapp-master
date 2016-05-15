import {Page,NavController} from 'ionic-angular';
import {AddAlunoPage} from "../add-aluno/add-aluno";
import {Grupo} from '../../providers/grupo/grupo';
import {AddGroupPage} from '../add-group/add-group';
import {NgZone} from 'angular2/core';


@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
  static get parameters() {
    return [[NavController],[Grupo],[NgZone]];
  }

  constructor(nav,GrupoService,zone) {
    this.nav = nav;
    this.zone = zone;
    this.view = "alunos";
    this.GrupoService = GrupoService;
  }

  onPageWillEnter(){
    setTimeout(() =>{
      this.zone.run(() => {
        this.GrupoService.getAll().subscribe((data) => {
          this.grupos = data;
        });
      });
    },50);
  }

  groups(){
    this.nav.push(AddGroupPage);
  }

  onSegmentChanged(event){
    this.view = event.value;
  }

  add(){
    this.nav.push(AddAlunoPage);
  }

}
