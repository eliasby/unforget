import { AbstractControl } from '@angular/forms';
import noWhitespaceValidator from './no-whitespace-validator';

describe('noWhitespaceValidator', () => {
  it('should return an object if it is a whitespace', () => {
    const result = noWhitespaceValidator({
      value: ' ',
    } as AbstractControl);
    expect(result).toBeTruthy();
    expect(result!['whitespace']).toBeTrue();
  });

  it('should return null if it is not a whitespace', () => {
    const result = noWhitespaceValidator({
      value: 'test',
    } as AbstractControl);
    expect(result).toBeNull();
  });
});
