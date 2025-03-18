import { $ } from '@wdio/globals';

class HomePage {
  // Selector for the first item using UiAutomator
  get firstItem() {
    return $('//XCUIElementTypeOther[@name="Sauce Labs Fleece Jacket"]');
  }

  // Selector para el segundo ítem en iOS
  get secondItem() {
    return $('//XCUIElementTypeOther[@name="Sauce Labs Backpack"]');
  }

  // Selector para el botón "Add To Cart" en iOS
  get addToCartButton() {
    return $('//XCUIElementTypeOther[@name="Add To Cart button"]');
  }

  // Selector para el icono del carrito en iOS usando un XPath
  get cartIcon() {
    return $('//XCUIElementTypeButton[@label="2"]');
  }


  get filterButton() {
    return $('//XCUIElementTypeOther[@name="sort button"]');
  }

  // Selector para la opción "Name - Ascending"
  get nameAscOption() {
    return $('//XCUIElementTypeOther[@name="nameAsc"]');
  }

  // Selector para la opción "Name - Descending"
  get nameDescOption() {
    return $('//XCUIElementTypeOther[@name="nameDesc"]');
  }

  // Selector para la opción "Price - Ascending"
  get priceAscOption() {
    return $('//XCUIElementTypeOther[@name="priceAsc"]');
  }

  // Selector para la opción "Price - Descending"
  get priceDescOption() {
    return $('//XCUIElementTypeOther[@name="priceDesc"]');
  }

  // Selector for the filter options in the menu


  get backButton() {
    return $('//XCUIElementTypeOther[@name="navigation back button"]');
  }
  // Selector for the total number of items in the cart (e.g., "1 item")
  

  // Method to wait for the app to load
  async waitForAppToLoad() {
    await browser.pause(5000); // Wait for 5 seconds (adjust as needed)
  }

  // Method to navigate back to the previous screen
  async goBack() {
    await this.backButton.waitForDisplayed({ timeout: 5000 }); // Espera a que el botón esté visible
    await this.backButton.click(); // Hace clic en el botón de retroceso
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


  // Method to open the filter menu
  async openFilterMenu() {
    await this.filterButton.waitForDisplayed({ timeout: 10000 });
    await this.filterButton.click();
  }

  // Method to apply a filter option (e.g., "Name - Ascending")
  async applyFilter(option: string) {
    // Abrir el menú de filtros
    await this.openFilterMenu();
  
    // Seleccionar la opción de filtro
    switch (option) {
      case 'Name - Ascending':
        await this.nameAscOption.waitForDisplayed({ timeout: 10000 });
        await this.nameAscOption.click();
        break;
      case 'Name - Descending':
        await this.nameDescOption.waitForDisplayed({ timeout: 10000 });
        await this.nameDescOption.click();
        break;
      case 'Price - Ascending':
        await this.priceAscOption.waitForDisplayed({ timeout: 10000 });
        await this.priceAscOption.click();
        break;
      case 'Price - Descending':
        await this.priceDescOption.waitForDisplayed({ timeout: 10000 });
        await this.priceDescOption.click();
        break;
      default:
        throw new Error(`Opción de filtro no válida: ${option}`);
    }
  }
}

export default new HomePage();