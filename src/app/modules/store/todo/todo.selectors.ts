import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo, TodoPriority, TodoStatus } from './todo.model';
import { TodoState, TODO_FEATURE_KEY } from './todo.reducer';

export const getTodoState = createFeatureSelector<TodoState>(TODO_FEATURE_KEY);

function sortByPriority(a: Todo, b: Todo): number {
  const orders = Object.values(TodoPriority).reverse();
  return (
    orders.indexOf(a.priority || TodoPriority.Low) -
    orders.indexOf(b.priority || TodoPriority.Low)
  );
}

export const getAllTodos = createSelector(getTodoState, (state) =>
  [...state.items].sort(sortByPriority),
);

export const getCompletedTodos = createSelector(
  getAllTodos,
  (allTodos: Todo[]) =>
    allTodos.filter((e) => e.status === TodoStatus.Complete),
);

export const getInProgressTodos = createSelector(
  getAllTodos,
  (allTodos: Todo[]) =>
    allTodos.filter((e) => e.status === TodoStatus.InProgress),
);
