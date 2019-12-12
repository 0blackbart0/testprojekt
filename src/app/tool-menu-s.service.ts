import { Injectable } from '@angular/core';
import { Shape } from './shapes/shape';
import {ComponentDirectorService} from './component-director.service';
@Injectable({
  providedIn: 'root'
})
export class ToolMenuSService{

  selectedShape:Shape=null;
//Menu
  toolMenuHeight:number=1;
  toolMenuWidth:number=23.5;
  toolMenuTopPos:number=0;
  toolMenuLeftPos:number=0;
  toolMenuVisibile:string="block";
//Buttons
  btnToShow:boolean[]=[true,true,true,true,true,true];
  btnCountGerade:boolean=true;
  //Rechteck =0
  //Monolog  =1
  //Maps     =2
  //Verbinder=3 #kommt weg!
  //Verlinker=4
  //Kreis    =5
  btnIDsAtRechteck:number[]=[0,1,2,4,5];
  btnIDsAtKreisLeft:number[]=[0,1,2];
  btnIDsAtKreisRight:number[]=[0,1,4];
  btnIDsAtStartShape:number[]=[0,1,2,3,4,5]

//Button Positions
  btnPositions: number[][]=[[30,1],[30,2],[30,3],[30,4],[30,5],[30,6]];
//Button Position Template Array
  btnPosTempArrUngerade: number[][]=[[8,2],[4,1],[12,1],[0,0],[16,0]];
  btnPosTempArrGerade: number[][]=[[8,2],[12,2],[4,1],[16,1],[0,0],[20,0]];

//Complete Function
  doToolMenu(){
    this.showToolMenu();
    this.setSelected();
    this.setButtonsToShow();
    this.setWidth();
    this.setPositionLeft();
    this.setPositionTop();
    this.setButtonPositionsLeft();
    this.setButtonPositionsTop();
  }
  
  setSelected(){
    this.selectedShape= this.CDService.LastSelected;
  }

  showToolMenu(){
    this.toolMenuVisibile="block";
  }

  hideToolMenu(){
    this.toolMenuVisibile="none";
  }

  setButtonPositionsLeft(){
    let tmp:number=0;
    let index:number=0;
    if(this.btnCountGerade===true)
    {
      for (let ind of this.btnToShow)      
      {
        if (ind === true){
          this.btnPositions[index][0]= this.btnPosTempArrGerade[tmp][0];
          tmp+=1;
        }
        index+=1;
      }
    }
    else{
      for (let ind of this.btnToShow)
      {
        if (ind === true){
          this.btnPositions[index][0]= this.btnPosTempArrUngerade[tmp][0];   
          tmp++;
        }
        index++;
      }
    }
  }

  setButtonPositionsTop(){
    let tmp:number=0;
    let index:number=0;
    if(this.btnCountGerade===true)
    {
      for (let ind of this.btnToShow)
      {
        if (ind === true){
          this.btnPositions[index][1]= this.btnPosTempArrGerade[tmp][1];
          tmp++;
        }
        index++;
      }
    }
    else{
      for (let ind of this.btnToShow)
      {
        if (ind === true){
          this.btnPositions[index][1]= this.btnPosTempArrUngerade[tmp][1];   
          tmp++;
        }
        index++;
      }
    }  
  }

  setWidth(){
    if(this.btnCountGerade===true)
      {
        this.toolMenuWidth=23.5;
      }
    else{
      this.toolMenuWidth=19.5
    }
  }

  setPositionTop():number{
    if (this.selectedShape!=null)
      {
        this.toolMenuTopPos=this.selectedShape.top + this.selectedShape.height;
        return(this.toolMenuTopPos)
      }
    return 0;
  }

  setPositionLeft(){
    if (this.selectedShape!=null)
      {
        this.toolMenuLeftPos=this.selectedShape.left + this.selectedShape.width/2 - this.toolMenuWidth/2;
        return(this.toolMenuLeftPos)
      }
    return(0);
  }

  setButtonsToShow(){
    this.btnToShow=[false,false,false,false,false,false,]
    if (this.selectedShape.instanceOf()==='dialog'){
      for (let i of this.btnIDsAtRechteck){
        this.btnCountGerade= ((this.btnIDsAtRechteck.length %2) >0)? false : true;
        this.btnToShow[i]=true;
      }
    }
    if (this.selectedShape.instanceOf()==='subKreisLeft'){
      for (let i of this.btnIDsAtKreisLeft){
        this.btnCountGerade= ((this.btnIDsAtKreisLeft.length %2) >0)? false : true;
        this.btnToShow[i]=true;
      }
    }
    if (this.selectedShape.instanceOf()==='subKreisRight'){
      for (let i of this.btnIDsAtKreisRight){
        this.btnCountGerade= ((this.btnIDsAtKreisRight.length %2) >0)? false : true;
        this.btnToShow[i]=true;
      }
    }
    if (this.selectedShape.instanceOf()==='startShape'){
      for (let i of this.btnIDsAtStartShape){
        this.btnCountGerade= ((this.btnIDsAtStartShape.length %2) >0)? false : true;
        this.btnToShow[i]=true;
      }
    }
  }
  constructor(private CDService:ComponentDirectorService) {
  }
}
