package spdn.be.sercurity.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spdn.be.entity.Cart;
import spdn.be.entity.CartItem;
import spdn.be.entity.Product;
import spdn.be.entity.SubCategory;
import spdn.be.exception.ErrorMessages;
import spdn.be.exception.RequestException;
import spdn.be.repository.CartItemRepository;
import spdn.be.repository.CartRepository;
import spdn.be.repository.ProductRepository;
import spdn.be.repository.UserRepository;
import spdn.be.sercurity.services.CartService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl  implements CartService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    CartItemRepository cartItemRepository;
    @Autowired
    CartRepository cartRepository;
    @Override
    public Cart addCartItem(Long id, Long productId, Integer quantity) {
        Optional<Cart> cartEntity = cartRepository.findByUserId(id, "open");

        if (!cartEntity.isPresent()) {

            Cart cartEntity1 = new Cart();
            cartEntity1.setCartStatus("open");
            cartEntity1.setUser(userRepository.findById(id).get());

            CartItem cartItemEntity = new CartItem();
            Product productEntity = productRepository.findById(productId).get();
            if(productEntity.getQuantity()<quantity)

                throw new RequestException(ErrorMessages.OUT_OF_STOCK.getErrorMessages());
            cartItemEntity.setCart(cartEntity1);
            cartItemEntity.setProduct(productEntity);
            cartItemEntity.setQuantity(quantity);
            cartItemEntity.setTotalPrice(quantity * productEntity.getPrice());

            cartEntity1.setCartItemList(Arrays.asList(cartItemEntity));

            cartEntity1.setTotalAmount(cartItemEntity.getTotalPrice());

            cartItemRepository.save(cartItemEntity);
            return cartRepository.save(cartEntity1);

        } else {

            Cart cartEntity1 = cartEntity.get();

            Product productEntity = productRepository.findById(productId).get();
            if(productEntity.getQuantity()<quantity)

                throw new RequestException(ErrorMessages.OUT_OF_STOCK.getErrorMessages());


            for(int i=0;i< cartEntity1.getCartItemList().size();i++){
                if(productEntity == cartEntity1.getCartItemList().get(i).getProduct())
                {
                    cartEntity1.getCartItemList().get(i).setProduct(productEntity);
                    cartEntity1.getCartItemList().get(i).setQuantity(cartEntity1.getCartItemList().get(i).getQuantity()+quantity);
                    cartEntity1.getCartItemList().get(i).setTotalPrice(cartEntity1.getCartItemList().get(i).getTotalPrice() + ( quantity * productEntity.getPrice()));


                    double grandtotal = 0;
                    for(CartItem cartItemEntity:cartEntity1.getCartItemList()){
                        grandtotal += cartItemEntity.getTotalPrice();
                    }
                    cartEntity1.setTotalAmount(grandtotal);

                    cartItemRepository.save(cartEntity1.getCartItemList().get(i));
                    return cartRepository.save(cartEntity1);
                }
            }

            CartItem cartItemEntity = new CartItem();
            cartItemEntity.setProduct(productEntity);
            cartItemEntity.setQuantity(quantity);
            cartItemEntity.setTotalPrice(quantity * productEntity.getPrice());
            cartEntity1.getCartItemList().add(cartItemEntity);

            double grandtotal = cartEntity.get().getTotalAmount();
            for(CartItem cartItemEntity1:cartEntity1.getCartItemList()){
                grandtotal += cartItemEntity1.getTotalPrice();
            }
            cartEntity1.setTotalAmount(grandtotal);

            cartItemRepository.save(cartItemEntity);
            return cartRepository.save(cartEntity1);
        }
    }

    @Override
    public void removeProductFromCart(Long id, Long productId) {
        Product productEntity = productRepository.findById(productId).get();
        Optional<Cart> cartEntity = cartRepository.findCartById(id, "open");
        Cart cartEntity1 = cartEntity.get();
        Long cartId=cartEntity1.getCartId();
        Integer quantity= cartItemRepository.getQuantity(productId);
        System.out.println(quantity + " quantity");
        System.out.println("cartid= "+cartId);

        cartItemRepository.deleteAProduct(cartId,productId);

        Optional<Cart> cartEntity2 = cartRepository.findCartById(id, "open");
        Cart cartEntity3 = cartEntity2.get();


        double grandTotal = 0;
        for(CartItem cartItemEntity3:cartEntity3.getCartItemList()){
            grandTotal += cartItemEntity3.getTotalPrice();
        }
        cartEntity1.setTotalAmount(grandTotal);
        cartRepository.save(cartEntity3);
    }

    @Override
    public List<CartItem> getCartItems(Long id) {
        Cart cartEntity= cartRepository.getCartByUserId(id,"open");
        return cartEntity.getCartItemList();

    }
}
