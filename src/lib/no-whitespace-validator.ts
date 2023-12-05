import { AbstractControl } from '@angular/forms';
import normalizeTodoName from './normalize-todo-name';

export default function noWhitespaceValidator(
  control: AbstractControl,
): { [key: string]: boolean } | null {
  const isWhitespace = normalizeTodoName(control.value || '').length === 0;
  return isWhitespace ? { whitespace: true } : null;
}
