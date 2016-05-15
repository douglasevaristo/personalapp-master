import {Directive,Input} from 'angular2/core';
import {NgModel} from 'angular2/common';

@Directive({
    selector: '[ngModel][mask]',
    inputs:['valor'],
    host: {
        '(keyup)' : 'onInputChange()'
    }
})

export class Mask{

    static get parameters() {
      return [[NgModel]];
    }
    constructor(model){
      this.model = model;
    }

    ngOnInit(){
      this.dividers = this.valor.replace(/\*/g,"").split("");
      this.dividers.push(" ");
      this.generatePattern(this.valor);
    }

    onInputChange(){
        this.modelValue = this.getModelValue();
        var stringToFormat = this.modelValue;
        if(stringToFormat.length < 10){
            stringToFormat = this.padString(stringToFormat);
        }

        this.viewValue = this.format(stringToFormat);
        this.model.viewToModelUpdate(this.modelValue);
        this.model.valueAccessor.writeValue(this.viewValue);
    }

    generatePattern(patternString){
        this.placeHolderCounts = (patternString.match(/\*/g) || []).length;
        for(var i = 0; i < this.placeHolderCounts; i++){
            patternString = patternString.replace('*',"{" + i + "}");
        }
        this.valor = patternString;
    }

    format(s) {
        var formattedString = this.valor;
        for(var i = 0; i < this.placeHolderCounts; i++){
            formattedString = formattedString.replace("{" + i + "}", s.charAt(i));
        }
        return formattedString;
    }

    padString(s){
        var pad = "          ";
        return (s + pad).substring(0, pad.length);
    }

    getModelValue(){
        var modelValue = this.model.value;
        for(var i = 0; i < this.dividers.length; i++){
            while(modelValue.indexOf(this.dividers[i]) > -1){
                modelValue = modelValue.replace(this.dividers[i], "");
            }
        }
        return modelValue;
    }
}
