import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './Todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];

  form: FormGroup = new FormGroup({
    description: new FormControl("", [Validators.required, Validators.minLength(4)])
  });

  constructor(
    private service: TodoService
  ){}
  
  ngOnInit(): void {
    this.listarTodos();
  };

listarTodos() {
  this.service.listar().subscribe(todoList => {
    this.todos = todoList;
  });
}

  submit() {
    const todo : Todo = {...this.form.value};
    this.service.salvar(todo).subscribe(todoSave => {
      this.todos.push(todoSave);
      this.form.reset();
    });
  }

  delete(todo: Todo) {
    this.service.delete(todo.id).subscribe({
      next: (response) => this.listarTodos()
    });
  }

  markAsDone(todo: Todo) {
    this.service.markAsDone(todo.id).subscribe({
      next: (todoAtualizado) => {
        console.log(todoAtualizado)
        todo.done = todoAtualizado.done;
        todo.doneDate = todoAtualizado.doneDate;
      }
    });
  }

}
