import normalizeTodoName from './normalize-todo-name';

describe('normalizeTodoName', () => {
  it('should normalize todo name', () => {
    const result = normalizeTodoName(' test ');
    expect(result.indexOf(' ')).toBe(-1);
  });
});
