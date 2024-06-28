import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit{

  //variables
  taskArray = [{ taskName: 'Brush Teeth', isCompleted: false, isEditable: false}];

  constructor() {}

  ngOnInit(): void{
    this.getFromLocalStorage();
  }



  //Submit button
  onSubmit(form: NgForm){
  console.log(form);

  this.taskArray.push({
    taskName: form.controls['task'].value,
    isCompleted: false,
    isEditable: false
  })
  
  this.saveToLocalStorage();

  form.reset();
  }

  getFromLocalStorage(){
    let valItemList = localStorage.getItem('todolist');

    if(valItemList != null){
      this.taskArray = JSON.parse(valItemList);
    }
  }

  saveToLocalStorage(){
    let valList = JSON.stringify(this.taskArray);
    localStorage.setItem('todolist',valList);
  }

  onDelete(index: number){
    console.log(index);

    this.taskArray.splice(index, 1);
    this.saveToLocalStorage();
  }

  onEdit(index: number){
    this.taskArray[index].isEditable = true;
    this.saveToLocalStorage();
  }

  onCheck(index: number){
    console.log(this.taskArray);

    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    this.saveToLocalStorage();
  }

  onSave(index: number, newtask: string){
    this.taskArray[index].taskName = newtask;
    this.taskArray[index].isEditable = false;
    this.saveToLocalStorage();
  }

}
