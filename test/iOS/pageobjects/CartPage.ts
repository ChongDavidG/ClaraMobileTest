import { $ } from '@wdio/globals';

class CartPage {

// Selector para el texto que muestra la cantidad de productos en el carrito (ejemplo: "2 items")
get cartItemCountText() {
  return $('//XCUIElementTypeButton[@label="2"]');
}

// Selector para obtener el nombre de un producto en el carrito (basado en su posición)
getProductName(index: number) {
  return $(`(//android.view.ViewGroup[@content-desc="cart item"])[${index + 1}]/android.widget.TextView`);
}

// Selector para el botón "Remove Item" de un producto específico
getRemoveItemButton(index: number) {
  return $('(//XCUIElementTypeOther[@name="remove item"])[1]');
}

// Método para esperar a que se cargue la pantalla del carrito
async waitForCartToLoad() {
  await browser.pause(5000); // Ajusta este tiempo según lo necesite tu app
}

// Método para obtener la cantidad de productos en el carrito
async getCartItemCount() {
  await this.waitForCartToLoad();
  // Espera explícita hasta que el texto con la cantidad de productos esté disponible
  await this.cartItemCountText.waitForDisplayed({ timeout: 10000 });
  const itemCountText = await this.cartItemCountText.getText(); // Ejemplo: "2 items"
  const itemCount = parseInt(itemCountText.match(/\d+/)?.[0] || '0');
  return itemCount;
}

// Método simplificado para eliminar el primer producto (la verificación se hará luego)
async removeProduct() {
  await this.waitForCartToLoad();

  const itemCount = await this.getCartItemCount();
  if (itemCount === 0) {
    throw new Error("No hay productos en el carrito para eliminar.");
  }

  // Obtener y almacenar el nombre del primer producto antes de eliminarlo (opcional, para log)
  let productName = '';
  try {
    productName = await this.getProductName(0).getText();
    console.log(`Producto a eliminar: ${productName}`);
  } catch (err) {
    console.warn('No se pudo obtener el nombre del producto.');
  }

  // Hacer clic en el botón "Remove Item" del primer producto
  const removeBtn = this.getRemoveItemButton(0);
  await removeBtn.waitForDisplayed({ timeout: 10000 });
  await removeBtn.click();

  console.log(`Acción de eliminación completada para el producto "${productName}".`);
}


  // Botón para proceder al checkout
  get checkoutButton() {
    return $('//XCUIElementTypeOther[@name="Proceed To Checkout button"]');
  }

  // Campos de login
  get userNameInput() {
    return $('//XCUIElementTypeTextField[@name="Username input field"]');
  }

  get passwordInput() {
    return $('//XCUIElementTypeOther[@name="Password"]');
  }

  get loginButton() {
    return $('//XCUIElementTypeOther[@name="Login button"]');
  }

  // Campos de dirección de envío
  get fullNameInput() {
    return $('//XCUIElementTypeTextField[@name="Full Name* input field"]');
 }

  get addressLine1Input() {
    return $('//XCUIElementTypeTextField[@name="Address Line 1* input field"]');
  }

  get cityInput() {
    return $('(//XCUIElementTypeOther[@name="Truro"])[2]');
 }

  get zipCodeInput() {
    return $('//XCUIElementTypeOther[@name="Zip Code* 89750"]');
}

  get countryInput() {
    return $('//XCUIElementTypeTextField[@name="Country* input field"]');
}

  get paymentButton() {
    return $('//XCUIElementTypeOther[@name="To Payment button"]');
  }

  // Campos de pago
  get fullNamePaymentInput() {
    return $('//XCUIElementTypeTextField[@name="Full Name* input field"]');
  }

  get cardNumberInput() {
    return $('//XCUIElementTypeTextField[@name="Card Number* input field"]');
  }

  get expirationDateInput() {
    return $('//XCUIElementTypeTextField[@name="Expiration Date* input field"]');
  }

  get securityCodeInput() {
    return $('//XCUIElementTypeOther[@name="Security Code* 123"]');
  }

  get reviewOrderButton() {
    return $('//XCUIElementTypeOther[@name="Review Order"]');
  }

  // Botón para realizar el pedido
  get placeOrderButton() {
    return $('//XCUIElementTypeOther[@name="Place Order button"]');
  }

  // Texto de confirmación de checkout completo
  get checkoutCompleteText() {
    return $('//XCUIElementTypeStaticText[@name="Checkout Complete"]');
  }

  get introButtonKeyboard() {
    return $('//XCUIElementTypeButton[@name="Return"]');
  }

  get screenTap() {
    return $('(//XCUIElementTypeOther[@name="Horizontal scroll bar, 1 page"])[4]')
  }
  // Método para proceder al checkout
  async proceedToCheckout() {
    await this.checkoutButton.waitForDisplayed({ timeout: 10000 });
    await this.checkoutButton.click();
  }

  // Método para iniciar sesión
  async login(username: string, password: string) {
    await this.userNameInput.waitForDisplayed({ timeout: 10000 });
    await this.userNameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  
    // Wait for a potential error message to appear
    await browser.pause(3000);
  
    const loginError = await $('//XCUIElementTypeStaticText[@name="Provided credentials do not match any user in this service."]');
  
    if (await loginError.isDisplayed()) {
      console.warn("Login failed. Retrying...");
  
      // Clear the input fields before retrying
      await this.userNameInput.clearValue();
      await this.passwordInput.clearValue();
      await browser.pause(1000); // Small delay before retrying
  
      // Re-enter credentials
      await this.userNameInput.click();
      await this.userNameInput.setValue(username);
      await this.passwordInput.setValue(password);
      await this.loginButton.click();
    }
  }

  // Método para llenar la dirección de envío
  async fillShippingDetails(details: {
    fullName: string;
    addressLine1: string;
    city: string;
    zipCode: string;
    country: string;
  }) {
    await this.fullNameInput.setValue(details.fullName);
    await this.addressLine1Input.setValue(details.addressLine1);
    await this.cityInput.setValue(details.city);
    await this.zipCodeInput.setValue(details.zipCode);
    await this.countryInput.setValue(details.country);
    await this.introButtonKeyboard.click()
    await this.paymentButton.click();
  }

  // Método para llenar los detalles de pago
  async fillPaymentDetails(details: {
    fullName: string;
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
  }) {

    await this.fullNamePaymentInput.setValue(details.fullName);
    await this.cardNumberInput.setValue(details.cardNumber);
    await this.expirationDateInput.setValue(details.expirationDate);
    await this.securityCodeInput.setValue(details.securityCode);
    await this.screenTap.click()
    await this.reviewOrderButton.click();
  }

  // Método para realizar el pedido
  async placeOrder() {
    await this.placeOrderButton.waitForDisplayed({ timeout: 10000 });
    await this.placeOrderButton.click();
  }

  // Método para verificar que el checkout se completó correctamente
  async verifyCheckoutComplete() {
    await this.checkoutCompleteText.waitForDisplayed({ timeout: 10000 });
    const isCheckoutComplete = await this.checkoutCompleteText.isDisplayed();
    expect(isCheckoutComplete).toBe(true);
  }
}

export default new CartPage();