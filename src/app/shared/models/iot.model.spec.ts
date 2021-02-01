import { Iot } from './iot.model';

describe('Iot', () => {
  it('should create an instance', () => {
    expect(new Iot(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), new Date("25 July 2016"))).toBeTruthy();
  });
});
