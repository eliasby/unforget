import { sentenceCase } from 'change-case-all';
import { TodoPriority } from '@/app/modules/store/todo/todo.model';

export type PriorityOption = {
  value: string;
  label: string;
};

export default function todoPriorityOptions(): PriorityOption[] {
  return Object.values(TodoPriority).map((e) => ({
    value: e,
    label: sentenceCase(e),
  }));
}
