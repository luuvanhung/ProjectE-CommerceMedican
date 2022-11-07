package spdn.be.sercurity.services;

import spdn.be.entity.Cart;
import spdn.be.entity.CartItem;

import java.util.List;

public interface CartService {
    Cart addCartItem(Long id, Long productId, Integer quantity);
    void removeProductFromCart(Long id,Long productId);
    List<CartItem> getCartItems(Long id);
}
