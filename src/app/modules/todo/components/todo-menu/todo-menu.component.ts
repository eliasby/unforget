import { Component, Inject, Injector, Input } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {
  Todo,
  TodoPriority,
  TodoStatus,
} from '@/app/modules/store/todo/todo.model';
import { TodoEditDialogComponent } from '@/app/modules/todo/components/todo-edit-dialog/todo-edit-dialog.component';
import { TodoRemoveDialogComponent } from '@/app/modules/todo/components/todo-remove-dialog/todo-remove-dialog.component';
import { newHashId } from '@/lib/new-hash-id';

@Component({
  selector: 'app-todo-menu',
  templateUrl: './todo-menu.component.html',
  styleUrls: ['./todo-menu.component.css'],
})
export class TodoMenuComponent {
  @Input() todo: Todo = {
    id: newHashId(),
    name: '',
    status: TodoStatus.InProgress,
    priority: TodoPriority.Low,
  };

  constructor(
    @Inject(TuiDialogService)
    public dialogs: TuiDialogService,
    @Inject(Injector)
    public injector: Injector,
  ) {}

  changeTodoName(todo: Todo) {
    this.dialogs
      .open<Todo>(
        new PolymorpheusComponent(TodoEditDialogComponent, this.injector),
        { data: todo, dismissible: false, label: 'Edit Todo' },
      )
      ?.subscribe();
  }

  removeTodo(todo: Todo) {
    this.dialogs
      .open<Todo>(
        new PolymorpheusComponent(TodoRemoveDialogComponent, this.injector),
        { data: todo, dismissible: true, label: 'Remove Todo' },
      )
      ?.subscribe();
  }
}
