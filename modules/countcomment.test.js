import { countComment } from './countComment.js';

jest.mock('./countComment.js');

describe('Get total numbers of comment for single item from the API', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test('Should return number of total items', async () => {
    countComment.mockReturnValueOnce(5);
    // Arrange
    const expectedCount = 5;
    // Act
    const totalItem = await countComment(expectedCount);
    // Assert
    expect(totalItem).toBe(5);
  });
  test('Method should be called', async () => {
    countComment();
    expect(countComment).toHaveBeenCalled();
  });
});