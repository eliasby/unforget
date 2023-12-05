import { createAction, props } from '@ngrx/store';
import { Todo, TodoPriority, TodoStatus } from './todo.model';

export const addTodo = createAction('[Todo] Add Todo', props<{ todo: Todo }>());

export const removeTodo = createAction(
  '[Todo] Remove Todo',
  props<{ id: string }>(),
);

export const updateTodoName = createAction(
  '[Todo] Update Todo Name',
  props<{ id: string; name: string }>(),
);

export const updateTodoPriority = createAction(
  '[Todo] Update Todo Priority',
  props<{ id: string; priority: TodoPriority }>(),
);

export const updateTodoStatus = createAction(
  '[Todo] Update Todo Status',
  props<{ id: string; status: TodoStatus }>(),
);
