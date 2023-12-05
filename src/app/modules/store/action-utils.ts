import {
  ActionCreatorProps,
  createAction,
  NotAllowedCheck,
  props,
} from '@ngrx/store';
import { ActionCreator, TypedAction } from '@ngrx/store/src/models';

type SuccessType<T extends string> = `${T} Success`;
type FailureType<T extends string> = `${T} Failure`;

export function createSuccessAction<
  T extends string,
  // @ts-ignore
  P extends Record<string, any> = undefined,
>(action: TypedAction<T>, config?: ActionCreatorProps<P> & NotAllowedCheck<P>) {
  return createAction(
    `${action.type} Success` as SuccessType<T>,
    // @ts-ignore
    config,
  ) as P extends undefined
    ? ActionCreator<SuccessType<T>, () => TypedAction<SuccessType<T>>>
    : ActionCreator<
        SuccessType<T>,
        (props: P & NotAllowedCheck<P>) => P & TypedAction<SuccessType<T>>
      >;
}

export function createFailureAction<T extends string>(action: TypedAction<T>) {
  return createAction(
    `${action.type} Failure` as FailureType<T>,
    props<{ error: any }>(),
  );
}
