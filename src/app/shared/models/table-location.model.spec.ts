import { TableLocation } from './table-location.model';
import { Location } from './location.model';

function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

var Location1 = new Location(Math.floor(Math.random() * 10), getRandomString(10), getRandomString(10), getRandomString(10));
describe('TableLocation', () => {
  it('should create an instance', () => {
    expect(new TableLocation(Math.floor(Math.random() * 10), getRandomString(10), getRandomString(10), Location1)).toBeTruthy();
  });
});
