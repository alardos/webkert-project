import { TimestampToTimePipe } from './timestamp-to-time.pipe';

describe('TimestampToTimePipe', () => {
  it('create an instance', () => {
    const pipe = new TimestampToTimePipe();
    expect(pipe).toBeTruthy();
  });
});
