import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiDialogService,
  TuiRootModule,
} from '@taiga-ui/core';
import { TuiInputModule, TuiSelectModule } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TodoPriority, TodoStatus } from '@/app/modules/store/todo/todo.model';
import {
  TODO_FEATURE_KEY,
  reducer,
} from '@/app/modules/store/todo/todo.reducer';
import { debugElementByTestId } from '@/lib/element-by-test-id';
import { newHashId } from '@/lib/new-hash-id';
import { TodoEditDialogComponent } from '../todo-edit-dialog/todo-edit-dialog.component';
import { TodoRemoveDialogComponent } from '../todo-remove-dialog/todo-remove-dialog.component';
import { TodoMenuComponent } from './todo-menu.component';

describe('TodoMenuComponent', () => {
  let fixture: ComponentFixture<TodoMenuComponent>;
  let component: TodoMenuComponent;
  let dialogs: TuiDialogService;
  let injector: Injector;
  const TODO = {
    id: newHashId(),
    name: 'todo',
    status: TodoStatus.InProgress,
    priority: TodoPriority.Low,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoMenuComponent],
      imports: [
        TuiDataListModule,
        TuiButtonModule,
        TuiInputModule,
        TuiSelectModule,
        TuiDialogModule,
        TuiRootModule,
        StoreModule.forRoot(reducer),
        StoreModule.forFeature(TODO_FEATURE_KEY, reducer),
      ],
    });

    dialogs = TestBed.inject(TuiDialogService);
    // injector = TestBed.inject(Injector);

    fixture = TestBed.createComponent(TodoMenuComponent);
    component = fixture.componentInstance;
    component.todo = TODO;
    component.dialogs = dialogs;
    component.injector = injector;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog edit todo dialog when edit button is clicked', () => {
    const openDialogSpy = spyOn(dialogs, 'open');

    const editButton = debugElementByTestId(fixture, 'edit-button');
    editButton.triggerEventHandler('click');

    expect(openDialogSpy).toHaveBeenCalledWith(
      new PolymorpheusComponent(TodoEditDialogComponent, injector),
      { data: TODO, dismissible: false, label: jasmine.any(String) },
    );
  });

  it('should open dialog remove todo dialog when remove button is clicked', () => {
    const openDialogSpy = spyOn(dialogs, 'open');

    const removeButton = debugElementByTestId(fixture, 'remove-button');
    removeButton.triggerEventHandler('click');

    expect(openDialogSpy).toHaveBeenCalledWith(
      new PolymorpheusComponent(TodoRemoveDialogComponent, injector),
      { data: TODO, dismissible: true, label: jasmine.any(String) },
    );
  });
});
