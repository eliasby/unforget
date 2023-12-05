import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  TuiContextWithImplicit,
  TuiStringHandler,
  tuiPure,
} from '@taiga-ui/cdk';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import {
  updateTodoName,
  updateTodoPriority,
} from '@/app/modules/store/todo/todo.actions';
import { Todo, TodoPriority } from '@/app/modules/store/todo/todo.model';
import noWhitespaceValidator from '@/lib/no-whitespace-validator';
import normalizeTodoName from '@/lib/normalize-todo-name';
import todoPriorityOptions, {
  PriorityOption,
} from '@/lib/todo-priority-options';

export interface EditTodoDialogData {
  todo: Todo;
}

@Component({
  selector: 'app-todo-edit-dialog',
  templateUrl: './todo-edit-dialog.component.html',
  styleUrls: ['./todo-edit-dialog.component.css'],
})
export class TodoEditDialogComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, noWhitespaceValidator]),
    priority: new FormControl(''),
  });
  priorities = todoPriorityOptions();

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<Todo, Todo>,
    private store: Store,
  ) {
    this.form.setValue({
      name: this.data.name,
      priority: this.data.priority,
    });
  }

  onSave() {
    const { name, priority } = this.form.getRawValue();
    if (normalizeTodoName(name!) !== this.data.name) {
      this.store.dispatch(
        updateTodoName({
          id: this.data.id,
          name: this.form.getRawValue().name!,
        }),
      );
    }
    if (priority !== this.data.priority) {
      this.store.dispatch(
        updateTodoPriority({
          id: this.data.id,
          priority: this.form.getRawValue().priority as TodoPriority,
        }),
      );
    }
    this.context.completeWith(this.data);
    return false;
  }

  onCancel() {
    this.context.completeWith(this.data);
  }

  get data(): Todo {
    return this.context.data;
  }

  get isPristine(): boolean {
    const { name, priority } = this.form.getRawValue();
    return (
      normalizeTodoName(name!) === this.data.name &&
      priority === this.data.priority
    );
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
