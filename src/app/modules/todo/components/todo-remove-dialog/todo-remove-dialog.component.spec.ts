import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core';
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
import { debugElementByTestId } from '@/lib/element-by-test-id';
import { newHashId } from '@/lib/new-hash-id';
import { TodoRemoveDialogComponent } from './todo-remove-dialog.component';

describe('RemoveTodoDialogComponent', () => {
  let store: Store;
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

  const findStoreTodos = () => {
    let result: Todo[] = [];
    store
      .pipe(select(getAllTodos))
      .subscribe((e) => (result = e))
      .unsubscribe();
    return result;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoRemoveDialogComponent],
      imports: [
        TuiButtonModule,
        TuiDialogModule,
        TuiRootModule,
        StoreModule.forRoot(reducer),
        StoreModule.forFeature(TODO_FEATURE_KEY, reducer),
      ],
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: TODOS[0],
            completeWith: () => {},
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    for (const todo of TODOS) {
      store.dispatch(addTodo({ todo }));
    }
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TodoRemoveDialogComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should remove todo from the store when remove button is clicked', () => {
    const fixture = TestBed.createComponent(TodoRemoveDialogComponent);
    fixture.detectChanges();

    const removeButton = debugElementByTestId(fixture, 'remove-button');
    removeButton.triggerEventHandler('click');

    const storeTodos = findStoreTodos();
    expect(storeTodos.find((e) => e.id === TODOS[0].id)).toBeFalsy();
  });

  it('should do nothing when cancel button is clicked', () => {
    const fixture = TestBed.createComponent(TodoRemoveDialogComponent);
    fixture.detectChanges();

    const cancelButton = debugElementByTestId(fixture, 'cancel-button');
    cancelButton.triggerEventHandler('click');

    const storeTodos = findStoreTodos();
    expect(storeTodos.find((e) => e.id === TODOS[0].id)).toBeTruthy();
  });
});
