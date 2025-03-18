import { $ } from '@wdio/globals';

class CartPage {

// Selector para el texto que muestra la cantidad de productos en el carrito (ejemplo: "2 items")
get cartItemCountText() {
  const selector = 'new UiSelector().textContains("items")';
  return $(`android=${selector}`);
}

// Selector para obtener el nombre de un producto en el carrito (basado en su posición)
getProductName(index: number) {
  return $(`(//android.view.ViewGroup[@content-desc="cart item"])[${index + 1}]/android.widget.TextView`);
}

// Selector para el botón "Remove Item" de un producto específico
getRemoveItemButton(index: number) {
  const selector = `new UiSelector().text("Remove Item").instance(${index})`;
  return $(`android=${selector}`);
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
    return $(`android=new UiSelector().text("Proceed To Checkout")`);
  }

  // Campos de login
  get userNameInput() {
    return $(`android=new UiSelector().description("Username input field")`);
  }

  get passwordInput() {
    return $(`android=new UiSelector().description("Password input field")`);
  }

  get loginButton() {
    return $(`(//android.widget.TextView[@text="Login"])[2]`);
  }

  // Campos de dirección de envío
  get fullNameInput() {
    return $(`//android.widget.EditText[@content-desc="Full Name* input field"]`);
  }

  get addressLine1Input() {
    return $(`//android.widget.EditText[@content-desc="Address Line 1* input field"]`);
  }

  get cityInput() {
    return $(`//android.widget.EditText[@content-desc="City* input field"]`);
  }

  get zipCodeInput() {
    return $(`//android.widget.EditText[@content-desc="Zip Code* input field"]`);
  }

  get countryInput() {
    return $(`//android.widget.EditText[@content-desc="Country* input field"]`);
  }

  get paymentButton() {
    return $(`//android.view.ViewGroup[@content-desc="To Payment button"]`);
  }

  // Campos de pago
  get fullNamePaymentInput() {
    return $(`//android.widget.EditText[@content-desc="Full Name* input field"]`);
  }

  get cardNumberInput() {
    return $(`//android.widget.EditText[@content-desc="Card Number* input field"]`);
  }

  get expirationDateInput() {
    return $(`//android.widget.EditText[@content-desc="Expiration Date* input field"]`);
  }

  get securityCodeInput() {
    return $(`//android.widget.EditText[@content-desc="Security Code* input field"]`);
  }

  get reviewOrderButton() {
    return $(`//android.widget.TextView[@text="Review Order"]`);
  }

  // Botón para realizar el pedido
  get placeOrderButton() {
    return $(`//android.view.ViewGroup[@content-desc="Place Order button"]`);
  }

  // Texto de confirmación de checkout completo
  get checkoutCompleteText() {
    return $(`//android.widget.TextView[@text="Checkout Complete"]`);
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
    await this.reviewOrderButton.click();
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