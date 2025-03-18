import { $ } from '@wdio/globals';

class HomePage {
  // Selector for the first item using UiAutomator
  get firstItem() {
    const selector = 'new UiSelector().className("android.widget.ImageView").instance(7)';
    return $(`android=${selector}`);
  }

  // Selector for the second item using UiAutomator
  get secondItem() {
    const selector = 'new UiSelector().className("android.widget.ImageView").instance(4)';
    return $(`android=${selector}`);
  }

  // Selector for the "Add To Cart" button using UiAutomator
  get addToCartButton() {
    const selector = 'new UiSelector().text("Add To Cart")';
    return $(`android=${selector}`);
  }

  // Selector for the shopping cart icon using UiAutomator
  get cartIcon() {
    const selector = 'new UiSelector().className("android.widget.ImageView").instance(2)';
    return $(`android=${selector}`);
  }

  // Selector for the filter button (hamburger menu)
  get filterButton() {
    const selector = 'new UiSelector().className("android.widget.ImageView").instance(2)';
    return $(`android=${selector}`);
  }

  // Selector for the filter options in the menu
  getFilterOption(option: string) {
    const selector = `new UiSelector().text("${option}")`;
    return $(`android=${selector}`);
  }

  // Selector for the total number of items in the cart (e.g., "1 item")
  get cartItemCountText() {
    const selector = 'new UiSelector().textContains("item")';
    return $(`android=${selector}`);
  }

  // Method to wait for the app to load
  async waitForAppToLoad() {
    await browser.pause(5000); // Wait for 5 seconds (adjust as needed)
  }

  // Method to navigate back to the previous screen
  async goBack() {
    await browser.back(); // Use the Android back button
  }

  // Method to add the first item to the cart
  async addFirstItemToCart() {
    await this.waitForAppToLoad(); // Wait for the app to load
    await this.firstItem.waitForDisplayed({ timeout: 5000 }); // Wait for the first item to be displayed
    await this.firstItem.click(); // Click the first item
    await this.addToCartButton.waitForDisplayed({ timeout: 5000 }); // Wait for the "Add To Cart" button
    await this.addToCartButton.click(); // Click "Add To Cart"
    await this.goBack(); // Navigate back to the product catalog
  }

  // Method to add the second item to the cart
  async addSecondItemToCart() {
    await this.waitForAppToLoad(); // Wait for the app to load
    await this.secondItem.waitForDisplayed({ timeout: 5000 }); // Wait for the second item to be displayed
    await this.secondItem.click(); // Click the second item
    await this.addToCartButton.waitForDisplayed({ timeout: 5000 }); // Wait for the "Add To Cart" button
    await this.addToCartButton.click(); // Click "Add To Cart"

  }

  // Method to navigate to the shopping cart
  async goToCart() {
    await this.cartIcon.click();
    await this.waitForAppToLoad();
  }

  // Method to get the number of items in the cart
  async getCartItemCount() {
    await this.cartItemCountText.waitForDisplayed({ timeout: 10000 });
    const itemCountText = await this.cartItemCountText.getText(); // Example: "1 item"
    const itemCountMatch = itemCountText.match(/\d+/); // Extract the number using regex
    const itemCount = itemCountMatch ? parseInt(itemCountMatch[0], 10) : 0; // Parse the number or default to 0
    return itemCount;
  }

  // Method to open the filter menu
  async openFilterMenu() {
    await this.filterButton.waitForDisplayed({ timeout: 10000 });
    await this.filterButton.click(); // Click the filter button
    await browser.pause(1000); // Wait for the menu to open
  }

  // Method to apply a filter option (e.g., "Name - Ascending")
  async applyFilter(option: string) {
    await this.openFilterMenu(); // Open the filter menu
    await this.getFilterOption(option).click(); // Click the desired filter option
    await browser.pause(2000); // Wait for the filter to be applied
  }
}

export default new HomePage();