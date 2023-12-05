import { newHashId } from '@/lib/new-hash-id';
import { Todo, TodoPriority, TodoStatus } from './todo.model';
import { TodoState } from './todo.reducer';
import {
  getAllTodos,
  getCompletedTodos,
  getInProgressTodos,
} from './todo.selectors';

describe('Todo Selectors', () => {
  const TODOS: Todo[] = [
    {
      id: newHashId(),
      name: 'todo 1',
      status: TodoStatus.InProgress,
      priority: TodoPriority.Medium,
    },
    {
      id: newHashId(),
      name: 'todo 2',
      status: TodoStatus.Complete,
      priority: TodoPriority.Low,
    },
    {
      id: newHashId(),
      name: 'todo 3',
      status: TodoStatus.InProgress,
      priority: TodoPriority.High,
    },
  ];
  const INITIAL_STATE: TodoState = {
    items: TODOS,
  };

  it('should get all todos sorted by priority', () => {
    const result = getAllTodos.projector(INITIAL_STATE);
    expect(result.length).toBe(INITIAL_STATE.items.length);
    expect(result[0].id).toBe(TODOS[2].id);
    expect(result[1].id).toBe(TODOS[0].id);
    expect(result[2].id).toBe(TODOS[1].id);
  });

  it('should get completed todos', () => {
    const result = getCompletedTodos.projector(INITIAL_STATE.items);
    expect(result.filter((e) => e.status !== TodoStatus.Complete).length).toBe(
      0,
    );
  });

  it('should get in progress todos', () => {
    const result = getInProgressTodos.projector(INITIAL_STATE.items);
    expect(
      result.filter((e) => e.status !== TodoStatus.InProgress).length,
    ).toBe(0);
  });
});
