import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule, select } from '@ngrx/store';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiHostedDropdownModule,
  TuiRootModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiPaginationModule,
  TuiSelectModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import { Todo, TodoPriority } from '@/app/modules/store/todo/todo.model';
import {
  reducer,
  TODO_FEATURE_KEY,
} from '@/app/modules/store/todo/todo.reducer';
import { getAllTodos } from '@/app/modules/store/todo/todo.selectors';
import {
  debugElementByTestId,
  nativeElementByTestId,
} from '@/lib/element-by-test-id';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let store: Store;
  const NAME = 'new todo';
  const PRIORITY = TodoPriority.High;

  const findTodoInStore = (): Todo | undefined => {
    let result;
    store
      .pipe(select(getAllTodos))
      .subscribe(
        (e) =>
          (result = e.find((e) => e.name === NAME && e.priority === PRIORITY)),
      )
      .unsubscribe();
    return result;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent, TodoListComponent, TodoItemComponent],
      imports: [
        TuiButtonModule,
        TuiInputModule,
        TuiDataListModule,
        TuiSelectModule,
        TuiDataListWrapperModule,
        TuiTabsModule,
        TuiHostedDropdownModule,
        TuiDialogModule,
        TuiAutoFocusModule,
        TuiPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TuiRootModule,
        StoreModule.forRoot(reducer),
        StoreModule.forFeature(TODO_FEATURE_KEY, reducer),
      ],
    }).compileComponents();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TodoComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should add todo to store when form is filled and add todo button is clicked', () => {
    const fixture = TestBed.createComponent(TodoComponent);
    fixture.detectChanges();

    const nameInputEl = nativeElementByTestId(
      fixture,
      'name-input',
    ) as HTMLInputElement;
    nameInputEl.value = NAME;
    nameInputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const prioritySelectEl = nativeElementByTestId(
      fixture,
      'priority-select',
    ) as HTMLSelectElement;
    prioritySelectEl.value = PRIORITY;
    prioritySelectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const addTodoButton = debugElementByTestId(fixture, 'add-todo-button');
    addTodoButton.triggerEventHandler('click');
    fixture.detectChanges();

    const found = findTodoInStore();
    expect(found).toBeTruthy();
  });

  it('should do nothing when name input is empty', () => {
    const fixture = TestBed.createComponent(TodoComponent);
    fixture.detectChanges();

    const addTodoButton = debugElementByTestId(fixture, 'add-todo-button');
    addTodoButton.triggerEventHandler('click');
    fixture.detectChanges();

    let allTodos = [];
    store
      .pipe(select(getAllTodos))
      .subscribe((e) => (allTodos = e))
      .unsubscribe();
    expect(allTodos.length).toBe(0);
  });
});
