import { ComponentFixture } from '@angular/core/testing';

export function debugElementByTestId<T>(
  fixture: ComponentFixture<T>,
  testId: string,
) {
  return fixture.debugElement.query(
    (e) => e.attributes['data-testid'] === testId,
  );
}

export function nativeElementByTestId<T>(
  fixture: ComponentFixture<T>,
  testId: string,
): HTMLElement {
  return fixture.debugElement.query(
    (e) => e.attributes['data-testid'] === testId,
  ).nativeElement;
}
