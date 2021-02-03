import { Role } from './role.model';

function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

describe('Role', () => {
  it('should create an instance', () => {
    expect(new Role(Math.floor(Math.random() * 10), getRandomString(10)
    )).toBeTruthy();
  });
});
