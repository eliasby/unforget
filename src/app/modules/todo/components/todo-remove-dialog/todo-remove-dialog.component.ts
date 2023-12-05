import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { removeTodo } from '@/app/modules/store/todo/todo.actions';
import { Todo } from '@/app/modules/store/todo/todo.model';

export interface RemoveTodoDialogData {
  todo: Todo;
}

@Component({
  selector: 'app-todo-remove-dialog',
  templateUrl: './todo-remove-dialog.component.html',
  styleUrls: ['./todo-remove-dialog.component.css'],
})
export class TodoRemoveDialogComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<Todo, Todo>,
    private store: Store,
  ) {}

  onRemove() {
    this.store.dispatch(removeTodo({ id: this.data.id }));
    this.context.completeWith(this.data);
  }

  onCancel() {
    this.context.completeWith(this.data);
  }

  get data(): Todo {
    return this.context.data;
  }
}
