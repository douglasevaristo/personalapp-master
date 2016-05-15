import {Component,ElementRef} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import Chart from '../../../node_modules/chart.js/src/chart';

@Component({
  selector: 'chart',
  inputs:['esperado','recebido','animate'],
  templateUrl: 'build/components/chart/chart.html',
  directives: [IONIC_DIRECTIVES] // makes all Ionic directives available to your component
})
export class ChartComponent {

  static get parameters() {
    return [[ElementRef]];
  }

  constructor(element) {
    this.element = element;
  }

  ngOnInit(){
    let ctx = this.element.nativeElement.querySelector("#chart").getContext('2d');;
    var data = {
        labels: [
            "Recebidos: R$"+(this.recebido),
            "Aguardando: R$"+(this.esperado - this.recebido)
        ],
        datasets: [
            {
                data: [this.recebido, (this.esperado - this.recebido)],
                backgroundColor: [
                    "#38af63"
                ]
            }]
    };

    this.chart = ctx != undefined && this.chart == null ? new Chart(ctx, {type: 'doughnut',data: data}) : null;
  }
}
