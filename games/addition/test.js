
import sum from './';

describe('1 + 1', () => {
    const result = sum(1, 1);

    it('should equal 2', () => {
        expect(result).toBe(2);
    })
})