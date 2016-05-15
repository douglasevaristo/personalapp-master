import {Page, NavController} from 'ionic-angular';
import {Grupo} from "../../providers/grupo/grupo";
import {GrupoModel} from "../../models/grupo-model";

@Page({
  templateUrl: 'build/pages/add-group/add-group.html',
})
export class AddGroupPage {
  static get parameters() {
    return [[NavController],[Grupo]];
  }

  constructor(nav,GrupoService) {
    this.nav = nav;
    this.GrupoService = GrupoService;
    this.nomeGrupo = "";
  }

  add(nomeGrupo){
    if((nomeGrupo != undefined && nomeGrupo.length == 0) && window.cordova){
      navigator.notification.alert(
          'Por favor, preencha o campo corretamente.',  // message
          function(){},         // callback
          'Atenção',            // title
          'ok'                  // buttonName
      );
      return;
    }else if((nomeGrupo != undefined && nomeGrupo.length == 0) && !window.cordova){
      alert("Por favor, preencha os campos vazios.");
      return;
    }

    let novoGrupo = new GrupoModel();
    novoGrupo.nome = this.nomeGrupo;
    this.GrupoService.add(novoGrupo).subscribe(() =>{
      this.nav.pop();
    });

  }

}
