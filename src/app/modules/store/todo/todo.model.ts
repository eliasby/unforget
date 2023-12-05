export enum TodoStatus {
  Complete = 'COMPLETE',
  InProgress = 'IN_PROGRESS',
}

export enum TodoPriority {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
}

export interface Todo {
  id: string;
  name: string;
  status: TodoStatus;
  priority: TodoPriority;
}
