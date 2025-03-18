import HomePage from '../pageobjects/HomePage';
import CartPage from '../pageobjects/CartPage';

// Importa el archivo JSON con los datos de prueba
import testData from '../data/testData.json';

describe('Shopping App - Checkout Flow (Data-Driven)', () => {
  // Itera sobre cada conjunto de datos en el archivo JSON
  testData.forEach((data) => {
    it(`should log in with ${data.username}, fill shipping details, complete payment, and place the order`, async () => {
      // Agregar productos al carrito
      await HomePage.addFirstItemToCart();
      await HomePage.addSecondItemToCart();

      // Ir al carrito
      await HomePage.goToCart();

      // Proceder al checkout
      await CartPage.proceedToCheckout();

      // Hacer login con las credenciales proporcionadas
      await CartPage.login(data.username, data.password);

      // Llenar detalles de envío con datos de prueba
      await CartPage.fillShippingDetails(data.shippingDetails);

      // Llenar detalles de pago con datos de prueba
      await CartPage.fillPaymentDetails(data.paymentDetails);

      // Realizar el pedido
      await CartPage.placeOrder();

      // Verificar que el checkout se completó correctamente
      await CartPage.verifyCheckoutComplete();
    });
  });
});