import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import { Observable } from 'rxjs';
import { addTodo } from '@/app/modules/store/todo/todo.actions';
import {
  Todo,
  TodoPriority,
  TodoStatus,
} from '@/app/modules/store/todo/todo.model';
import {
  getAllTodos,
  getCompletedTodos,
  getInProgressTodos,
} from '@/app/modules/store/todo/todo.selectors';
import { newHashId } from '@/lib/new-hash-id';
import noWhitespaceValidator from '@/lib/no-whitespace-validator';
import todoPriorityOptions, {
  PriorityOption,
} from '@/lib/todo-priority-options';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, noWhitespaceValidator]),
    priority: new FormControl(TodoPriority.High),
  });
  allTodos$: Observable<Todo[]> = this.store.pipe(select(getAllTodos));
  completedTodos$: Observable<Todo[]> = this.store.pipe(
    select(getCompletedTodos),
  );
  inProgressTodos$: Observable<Todo[]> = this.store.pipe(
    select(getInProgressTodos),
  );
  allTodos: Todo[] = [];
  completedTodos: Todo[] = [];
  inProgressTodos: Todo[] = [];
  priorities = todoPriorityOptions();
  activeTabIndex = 0;

  constructor(private store: Store) {}

  ngOnInit() {
    this.allTodos$.subscribe((e) => (this.allTodos = e));
    this.completedTodos$.subscribe((e) => (this.completedTodos = e));
    this.inProgressTodos$.subscribe((e) => (this.inProgressTodos = e));
  }

  addNewTodo() {
    const { name, priority } = this.form.getRawValue();
    if (!name) {
      return;
    }
    this.store.dispatch(
      addTodo({
        todo: {
          id: newHashId(),
          name: name!,
          priority: priority as TodoPriority,
          status: TodoStatus.InProgress,
        },
      }),
    );
    this.form.get('name')!.reset();
  }

  @tuiPure
  stringify(
    items: readonly PriorityOption[],
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(
      items.map(({ value, label }) => [value, label] as [string, string]),
    );
    return ({ $implicit }: TuiContextWithImplicit<string>) =>
      map.get($implicit) || '';
  }
}
