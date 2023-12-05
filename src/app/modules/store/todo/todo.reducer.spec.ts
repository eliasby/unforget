import { newHashId } from '@/lib/new-hash-id';
import {
  addTodo,
  updateTodoName,
  updateTodoPriority,
  updateTodoStatus,
  removeTodo,
} from './todo.actions';
import { Todo, TodoPriority, TodoStatus } from './todo.model';
import { TodoState, reducer } from './todo.reducer';

describe('Todo Reducer', () => {
  it('should add todo', () => {
    const INITIAL_STATE: TodoState = {
      items: [],
    };
    const TODO: Todo = {
      id: newHashId(),
      name: 'todo',
      priority: TodoPriority.Low,
      status: TodoStatus.InProgress,
    };
    const state = reducer(INITIAL_STATE, addTodo({ todo: TODO }));
    expect(state.items.find((e) => e.id === TODO.id)).toBeTruthy();
  });

  it('should remove todo', () => {
    const TODO: Todo = {
      id: newHashId(),
      name: 'todo',
      priority: TodoPriority.Low,
      status: TodoStatus.InProgress,
    };
    const INITIAL_STATE: TodoState = {
      items: [TODO],
    };
    const state = reducer(INITIAL_STATE, removeTodo({ id: TODO.id }));
    expect(state.items.find((e) => e.id === TODO.id)).toBeFalsy();
  });

  it('should change todo name', () => {
    const TODO: Todo = {
      id: newHashId(),
      name: 'todo',
      priority: TodoPriority.Low,
      status: TodoStatus.InProgress,
    };
    const INITIAL_STATE: TodoState = {
      items: [TODO],
    };
    const NEW_NAME = 'new todo';
    const state = reducer(
      INITIAL_STATE,
      updateTodoName({ id: TODO.id, name: NEW_NAME }),
    );
    expect(state.items.find((e) => e.id === TODO.id)!.name).toBe(NEW_NAME);
  });

  it('should change todo priority', () => {
    const TODO: Todo = {
      id: newHashId(),
      name: 'todo',
      priority: TodoPriority.Low,
      status: TodoStatus.InProgress,
    };
    const INITIAL_STATE: TodoState = {
      items: [TODO],
    };
    const NEW_PRIORITY = TodoPriority.High;
    const state = reducer(
      INITIAL_STATE,
      updateTodoPriority({ id: TODO.id, priority: NEW_PRIORITY }),
    );
    expect(state.items.find((e) => e.id === TODO.id)!.priority).toBe(
      NEW_PRIORITY,
    );
  });

  it('should change todo status', () => {
    const TODO: Todo = {
      id: newHashId(),
      name: 'todo',
      priority: TodoPriority.Low,
      status: TodoStatus.InProgress,
    };
    const INITIAL_STATE: TodoState = {
      items: [TODO],
    };
    const NEW_STATUS = TodoStatus.Complete;
    const state = reducer(
      INITIAL_STATE,
      updateTodoStatus({ id: TODO.id, status: NEW_STATUS }),
    );
    expect(state.items.find((e) => e.id === TODO.id)!.status).toBe(NEW_STATUS);
  });
});
