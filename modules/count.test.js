import { countItem } from './count.js';

jest.mock('./count.js');

describe('Get total numbers of item from the API', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Should return number of total items', async () => {
    countItem.mockReturnValueOnce(59);
    // Arrange
    const expectedNumber = 59;
    // Act
    const totalItem = await countItem();
    // Assert
    expect(totalItem).toBe(expectedNumber);
  });
  test('Method should be called', async () => {
    countItem();
    expect(countItem).toHaveBeenCalled();
  });
});