import { TodoPriority } from '@/app/modules/store/todo/todo.model';
import todoPriorityOptions from './todo-priority-options';

describe('todoPriorityOptions', () => {
  it('should return todo priority options', () => {
    const result = todoPriorityOptions();
    expect(result.length).toBe(Object.values(TodoPriority).length);
  });
});
