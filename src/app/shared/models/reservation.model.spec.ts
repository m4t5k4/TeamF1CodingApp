import { Reservation } from './reservation.model';
import { User } from './user.model';
import { Location } from './location.model';
import { TableLocation } from './table-location.model';
import { Place } from './place.model';

function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}
var user1 = new User(Math.floor(Math.random() * 10), getRandomString(10),getRandomString(10),getRandomString(10),getRandomString(10),getRandomString(10));
var location1 = new Location(Math.floor(Math.random() * 10), getRandomString(10), getRandomString(10), getRandomString(10));
var tablelocation1 = new TableLocation(Math.floor(Math.random() * 10), getRandomString(10), getRandomString(10), location1);
var place1 = new Place(Math.floor(Math.random() * 10),"Name", tablelocation1,false)


describe('Reservation', () => {
  it('should create an instance', () => {
    expect(new Reservation(Math.floor(Math.random() * 10), new Date("25 July 2016"), null, null, Math.floor(Math.random() * 10), getRandomString(10), user1, null, null)).toBeTruthy();
  });
});
