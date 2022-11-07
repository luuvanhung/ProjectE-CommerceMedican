package spdn.be.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spdn.be.entity.Cart;
import spdn.be.entity.CartItem;
import spdn.be.exception.ErrorMessages;
import spdn.be.exception.RequestException;
import spdn.be.sercurity.services.CartService;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cart")
//http://localhost:8080/cart/add/{userid}/{productId}?quantity=3

public class CartController {
    @Autowired
    CartService cartService;
    private Long productId;
    private Integer quantity;

    @PutMapping("/add/{id}/{productId}")
    public ResponseEntity<Cart> addCartItem(@PathVariable(value = "productId") Long productId,
                                            @PathVariable(value = "id" )Long id,
                                            @RequestParam (value = "quantity") Integer quantity) throws Exception {
        this.productId = productId;
        this.quantity = quantity;
        if (productId == null || !(quantity>0)){

            throw new RequestException(ErrorMessages.CART_QUANTITY_PID_ERROR.getErrorMessages());}

        else {

            Cart cartEntity = cartService.addCartItem(id, productId, quantity);
            return new ResponseEntity<>(cartEntity, HttpStatus.CREATED);
        }


    }
    @GetMapping("/get-cartitem/{id}")
    public List<CartItem> getCartItems(@PathVariable Long id){

       return    cartService.getCartItems(id);

    }
    @DeleteMapping("/remove/{id}/{productId}")
    public void removeProductFromCart(@PathVariable Long id
            ,@PathVariable(value = "id") Long productId){
        if (productId == null ){
            throw new RequestException(ErrorMessages.CART_PRODUCTID_NOTFOUND.getErrorMessages());}

        else {

            cartService.removeProductFromCart(id, productId);

        }

    }

}
