import { Injectable } from '@angular/core';
import { Todo } from './Todo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  httpApi: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ){}

  salvar(todo: Todo) : Observable<Todo> {
    return this.http.post<Todo>(this.httpApi, todo);
  }

  listar() : Observable<Todo[]> {
    return this.http.get<Todo[]>(this.httpApi);
  }

  delete(id:number) : Observable<void> {
    const url = `${this.httpApi}/${id}`;
    return this.http.delete<void>(url);
  }

  markAsDone(id: number) : Observable<Todo> {
    const url = `${this.httpApi}/done/${id}`;
    return this.http.patch<Todo>(url,{});
  }
}
