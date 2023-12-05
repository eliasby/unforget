import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { Todo } from '@/app/modules/store/todo/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements AfterViewInit, OnChanges {
  @Input() todos: Todo[] = [];
  @Input() emptyLabel: string = 'No todos.';
  @Input() pageSize: number = 5;
  pagedTodos: Todo[] = [];
  pageIndex = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.paginate();
    this.cdr.detectChanges();
  }

  ngOnChanges() {
    this.paginate();
  }

  goToPage(index: number) {
    this.pageIndex = index;
    this.paginate();
  }

  paginate() {
    const from = this.pageIndex * this.pageSize;
    const to = from + this.pageSize;
    this.pagedTodos = this.todos.slice(from, to);
  }

  get pageCount() {
    return Math.ceil(this.todos.length / this.pageSize);
  }
}
