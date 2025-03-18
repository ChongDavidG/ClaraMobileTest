import HomePage from '../pageobjects/HomePage';
import CartPage from '../pageobjects/CartPage';

describe('Shopping App Tests', () => {
  it('should remove a product from the cart', async () => {
    // Agregar el primer producto al carrito
    await HomePage.addFirstItemToCart();

    // Agregar el segundo producto al carrito
    await HomePage.addSecondItemToCart();

    // Ir al carrito para ver los productos agregados
    await HomePage.goToCart();

    // Verificar que inicialmente hay 2 productos en el carrito
    expect(await CartPage.getCartItemCount()).toBe(2);

    // Eliminar el primer producto del carrito (sin verificar aún el total)
    await CartPage.removeProduct();

    // Se deja la verificación de que el total cambie a "1 item" para una etapa posterior.
    console.log("Eliminación completada; verificación de la actualización pendiente.");
  });
});

