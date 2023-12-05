import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiDataListWrapperModule,
  TuiSelectModule,
  TuiTabsModule,
  TuiPaginationModule,
} from '@taiga-ui/kit';
import { TodoEditDialogComponent } from './components/todo-edit-dialog/todo-edit-dialog.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoMenuComponent } from './components/todo-menu/todo-menu.component';
import { TodoRemoveDialogComponent } from './components/todo-remove-dialog/todo-remove-dialog.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    TodoComponent,
    TodoEditDialogComponent,
    TodoRemoveDialogComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoMenuComponent,
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    TuiButtonModule,
    TuiInputModule,
    TuiDataListModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiTabsModule,
    TuiHostedDropdownModule,
    TuiDialogModule,
    TuiRootModule,
    TuiAutoFocusModule,
    TuiPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TodoModule {}
