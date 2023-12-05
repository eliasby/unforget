import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule, select } from '@ngrx/store';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { TuiInputModule, TuiSelectModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
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
import { TodoEditDialogComponent } from './todo-edit-dialog.component';

describe('EditTodoDialogComponent', () => {
  let store: Store;
  const TODO = {
    id: newHashId(),
    name: 'todo',
    status: TodoStatus.InProgress,
    priority: TodoPriority.Low,
  };
  const NEW_NAME = 'new todo';
  const NEW_PRIORITY = TodoPriority.Low;

  const updateValues = (fixture: ComponentFixture<TodoEditDialogComponent>) => {
    const nameInputEl = nativeElementByTestId(
      fixture,
      'name-input',
    ) as HTMLInputElement;
    nameInputEl.value = NEW_NAME;
    nameInputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const prioritySelectEl = nativeElementByTestId(
      fixture,
      'priority-select',
    ) as HTMLSelectElement;
    prioritySelectEl.value = NEW_PRIORITY;
    prioritySelectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  };

  const findTodoInStore = (): Todo | undefined => {
    let result;
    store
      .pipe(select(getAllTodos))
      .subscribe((e) => (result = e.find((e) => e.id === TODO.id)))
      .unsubscribe();
    return result;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoEditDialogComponent],
      imports: [
        TuiDataListModule,
        TuiButtonModule,
        TuiInputModule,
        TuiSelectModule,
        TuiDialogModule,
        TuiRootModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducer),
        StoreModule.forFeature(TODO_FEATURE_KEY, reducer),
      ],
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: TODO,
            completeWith: () => {},
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    store.dispatch(addTodo({ todo: TODO }));
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TodoEditDialogComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should update todo in the store when save button is clicked', () => {
    const fixture = TestBed.createComponent(TodoEditDialogComponent);
    fixture.detectChanges();

    updateValues(fixture);

    const saveButton = debugElementByTestId(fixture, 'save-button');
    saveButton.triggerEventHandler('click');

    const found = findTodoInStore();
    expect(found!.name).toBe(NEW_NAME);
    expect(found!.priority).toBe(NEW_PRIORITY);
  });

  it('should do nothing when cancel button is clicked', () => {
    const fixture = TestBed.createComponent(TodoEditDialogComponent);
    fixture.detectChanges();

    updateValues(fixture);

    const cancelButton = debugElementByTestId(fixture, 'cancel-button');
    cancelButton.triggerEventHandler('click');

    const found = findTodoInStore();
    expect(found!.name).toBe(TODO.name);
    expect(found!.priority).toBe(TODO.priority);
  });
});
