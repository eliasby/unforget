import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateTodoStatus } from '@/app/modules/store/todo/todo.actions';
import {
  Todo,
  TodoPriority,
  TodoStatus,
} from '@/app/modules/store/todo/todo.model';
import { newHashId } from '@/lib/new-hash-id';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo: Todo = {
    id: newHashId(),
    name: '',
    status: TodoStatus.InProgress,
    priority: TodoPriority.Low,
  };

  constructor(private store: Store) {}

  toggleTodoStatus(todo: Todo) {
    if (todo.status === TodoStatus.Complete) {
      this.store.dispatch(
        updateTodoStatus({ id: todo.id, status: TodoStatus.InProgress }),
      );
    } else if (todo.status === TodoStatus.InProgress) {
      this.store.dispatch(
        updateTodoStatus({ id: todo.id, status: TodoStatus.Complete }),
      );
    }
  }

  get isComplete(): boolean {
    return this.todo.status === TodoStatus.Complete;
  }

  get toggleIcon(): string {
    return this.isComplete ? 'tuiIconRotateCcw' : 'tuiIconCheck';
  }
}
