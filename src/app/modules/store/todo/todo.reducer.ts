import { Action, createReducer, on } from '@ngrx/store';
import normalizeTodoName from 'src/lib/normalize-todo-name';
import * as actions from './todo.actions';
import { Todo } from './todo.model';

export const TODO_FEATURE_KEY = 'todo';
export const TODO_ITEMS_KEY = 'items';

export interface TodoState {
  items: Todo[];
}

export const initialState: TodoState = {
  items: [],
};

const todoReducer = createReducer(
  initialState,
  on(actions.addTodo, (state, { todo }) => ({
    ...state,
    items: [
      {
        ...todo,
        name: normalizeTodoName(todo.name),
      },
      ...state.items,
    ],
  })),
  on(actions.removeTodo, (state, { id }) => ({
    ...state,
    items: state.items.filter((e) => e.id !== id),
  })),
  on(actions.updateTodoName, (state, { id, name }) => ({
    ...state,
    items: state.items.map((e) =>
      e.id === id ? { ...e, name: normalizeTodoName(name) } : e,
    ),
  })),
  on(actions.updateTodoPriority, (state, { id, priority }) => ({
    ...state,
    items: state.items.map((e) => (e.id === id ? { ...e, priority } : e)),
  })),
  on(actions.updateTodoStatus, (state, { id, status }) => ({
    ...state,
    items: state.items.map((e) => (e.id === id ? { ...e, status } : e)),
  })),
);

export function reducer(state: TodoState | undefined, action: Action) {
  return todoReducer(state, action);
}
