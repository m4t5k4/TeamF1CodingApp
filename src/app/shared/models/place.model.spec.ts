import { Place } from './place.model';
import { Location } from './location.model';
import { TableLocation } from './table-location.model';

function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

var Location1 = new Location(Math.floor(Math.random() * 10), getRandomString(10), getRandomString(10), getRandomString(10));
var TableLocation1 = new TableLocation(Math.floor(Math.random() * 10), getRandomString(10), getRandomString(10), Location1);


describe('Place', () => {
  it('should create an instance', () => {
    expect(new Place(Math.floor(Math.random() * 10),"Name", TableLocation1,false)).toBeTruthy();
  });
});


