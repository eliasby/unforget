import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiHostedDropdownModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { TuiInputModule, TuiSelectModule } from '@taiga-ui/kit';
import { map } from 'rxjs';
import { addTodo } from '@/app/modules/store/todo/todo.actions';
import {
  Todo,
  TodoPriority,
  TodoStatus,
} from '@/app/modules/store/todo/todo.model';
import {
  reducer,
  TODO_FEATURE_KEY,
} from '@/app/modules/store/todo/todo.reducer';
import { getAllTodos } from '@/app/modules/store/todo/todo.selectors';
import {
  debugElementByTestId,
  nativeElementByTestId,
} from '@/lib/element-by-test-id';
import { newHashId } from '@/lib/new-hash-id';
import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let store: Store;
  const TODO = {
    id: newHashId(),
    name: 'todo',
    status: TodoStatus.InProgress,
    priority: TodoPriority.Low,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [
        TuiHostedDropdownModule,
        TuiDataListModule,
        TuiButtonModule,
        TuiInputModule,
        TuiSelectModule,
        TuiDialogModule,
        TuiRootModule,
        StoreModule.forRoot(reducer),
        StoreModule.forFeature(TODO_FEATURE_KEY, reducer),
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    store.dispatch(addTodo({ todo: TODO }));
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    const component = fixture.componentInstance;
    component.todo = TODO;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should contain name label', () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    const component = fixture.componentInstance;
    component.todo = TODO;
    fixture.detectChanges();

    const name = nativeElementByTestId(fixture, 'name-label');
    expect(name).toBeTruthy();
  });

  it('should render correct name', () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    const component = fixture.componentInstance;
    component.todo = TODO;
    fixture.detectChanges();

    const name = nativeElementByTestId(fixture, 'name-label');
    expect(name.textContent?.trim()).toBe(TODO.name);
  });

  it('should have complete class if status is completed', () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    const component = fixture.componentInstance;
    component.todo = { ...TODO, status: TodoStatus.Complete };
    fixture.detectChanges();

    const name = nativeElementByTestId(fixture, 'name-label');
    expect(name).toHaveClass('complete');
  });

  it('should not have complete class if status is in progress', () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    const component = fixture.componentInstance;
    component.todo = { ...TODO, status: TodoStatus.InProgress };
    fixture.detectChanges();

    const name = nativeElementByTestId(fixture, 'name-label');
    expect(name).not.toHaveClass('complete');
  });

  it('should toggle todo status to complete in store when complete button is clicked', () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    const component = fixture.componentInstance;
    component.todo = TODO;
    fixture.detectChanges();

    const completeButton = debugElementByTestId(fixture, 'complete-button');
    completeButton.triggerEventHandler('click');

    let found: Todo | undefined;
    store
      .pipe(
        select(getAllTodos),
        map((allTodos) => allTodos.find((e) => e.id === TODO.id)),
      )
      .subscribe((e) => (found = e));
    expect(found!.status).toBe(TodoStatus.Complete);
  });

  it('should toggle todo status to in progress in store when complete button is clicked', () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    const component = fixture.componentInstance;
    component.todo = { ...TODO, status: TodoStatus.Complete };
    fixture.detectChanges();

    const completeButton = debugElementByTestId(fixture, 'complete-button');
    completeButton.triggerEventHandler('click');

    let found: Todo | undefined;
    store
      .pipe(
        select(getAllTodos),
        map((allTodos) => allTodos.find((e) => e.id === TODO.id)),
      )
      .subscribe((e) => (found = e));
    expect(found!.status).toBe(TodoStatus.InProgress);
  });
});
