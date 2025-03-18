import HomePage from '../pageobjects/HomePage';

describe('Filter Functionality Tests', () => {
  it('should apply the "Name - Ascending" filter', async () => {
    // Apply the "Name - Ascending" filter
    await HomePage.applyFilter('Name - Ascending');
    console.log('Applied "Name - Ascending" filter.');
  });

  it('should apply the "Name - Descending" filter', async () => {
    // Apply the "Name - Descending" filter
    await HomePage.applyFilter('Name - Descending');
    console.log('Applied "Name - Descending" filter.');
  });

  it('should apply the "Price - Ascending" filter', async () => {
    // Apply the "Price - Ascending" filter
    await HomePage.applyFilter('Price - Ascending');
    console.log('Applied "Price - Ascending" filter.');
  });

  it('should apply the "Price - Descending" filter', async () => {
    // Apply the "Price - Descending" filter
    await HomePage.applyFilter('Price - Descending');
    console.log('Applied "Price - Descending" filter.');
  });
});