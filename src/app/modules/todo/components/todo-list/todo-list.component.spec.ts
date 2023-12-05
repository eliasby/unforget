import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiHostedDropdownModule,
  TuiRootModule,
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiPaginationModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import {
  Todo,
  TodoPriority,
  TodoStatus,
} from '@/app/modules/store/todo/todo.model';
import {
  reducer,
  TODO_FEATURE_KEY,
} from '@/app/modules/store/todo/todo.reducer';
import { TodoItemComponent } from '@/app/modules/todo/components/todo-item/todo-item.component';
import { nativeElementByTestId } from '@/lib/element-by-test-id';
import { newHashId } from '@/lib/new-hash-id';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  const TODOS: Todo[] = [
    {
      id: newHashId(),
      name: 'todo 1',
      status: TodoStatus.InProgress,
      priority: TodoPriority.High,
    },
    {
      id: newHashId(),
      name: 'todo 2',
      status: TodoStatus.Complete,
      priority: TodoPriority.Medium,
    },
    {
      id: newHashId(),
      name: 'todo 3',
      status: TodoStatus.InProgress,
      priority: TodoPriority.Low,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoItemComponent],
      imports: [
        TuiHostedDropdownModule,
        TuiDataListModule,
        TuiButtonModule,
        TuiInputModule,
        TuiSelectModule,
        TuiDialogModule,
        TuiPaginationModule,
        TuiRootModule,
        StoreModule.forRoot(reducer),
        StoreModule.forFeature(TODO_FEATURE_KEY, reducer),
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    const component = fixture.componentInstance;
    component.todos = TODOS;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should contain correct number of todo items', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    const component = fixture.componentInstance;
    component.todos = TODOS;
    fixture.detectChanges();

    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelectorAll('app-todo-item').length).toBe(TODOS.length);
  });

  it('should show empty label when empty', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    const component = fixture.componentInstance;
    component.todos = [];
    fixture.detectChanges();

    const emptyLabel = nativeElementByTestId(fixture, 'empty-label');
    expect(emptyLabel).toBeTruthy();
    expect(emptyLabel.textContent).toMatch(/no todos./i);
  });

  it('should support custom value on empty label', () => {
    const CUSTOM_EMPTY_LABEL = 'custom';

    const fixture = TestBed.createComponent(TodoListComponent);
    const component = fixture.componentInstance;
    component.todos = [];
    component.emptyLabel = CUSTOM_EMPTY_LABEL;
    fixture.detectChanges();

    component.todos = [];
    fixture.detectChanges();

    const emptyLabel = nativeElementByTestId(fixture, 'empty-label');
    expect(emptyLabel.textContent?.trim()).toBe(CUSTOM_EMPTY_LABEL);
  });

  it('should paginate items', () => {
    const PAGE_SIZE = 5;
    const LENGTH = 13;
    const MANY_TODOS: Todo[] = [];
    for (let i = 1; i <= LENGTH; i++) {
      MANY_TODOS.push({
        id: newHashId(),
        name: `todo ${i}`,
        priority: TodoPriority.Low,
        status: TodoStatus.InProgress,
      });
    }

    const fixture = TestBed.createComponent(TodoListComponent);
    const component = fixture.componentInstance;
    component.todos = MANY_TODOS;
    component.pageSize = PAGE_SIZE;
    fixture.detectChanges();

    const root: HTMLElement = fixture.nativeElement;

    expect(root.querySelectorAll('app-todo-item').length).toBe(PAGE_SIZE);

    const paginate = (pageIndex: number) => {
      const from = pageIndex * PAGE_SIZE;
      const to = from + PAGE_SIZE;
      return MANY_TODOS.slice(from, to);
    };

    component.goToPage(1);
    fixture.detectChanges();

    expect(root.querySelectorAll('app-todo-item').length).toBe(
      paginate(1).length,
    );

    component.goToPage(2);
    fixture.detectChanges();

    expect(root.querySelectorAll('app-todo-item').length).toBe(
      paginate(2).length,
    );
  });
});
