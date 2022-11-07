package spdn.be.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "cartitem")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long cartItemId;


    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "product_id",
            referencedColumnName = "productId")

    private Product product;

    private int quantity;
    private double totalPrice;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id")
    @JsonIgnore
    private Cart cart;

    public CartItem(Product product,int quantity,Cart cart) {
        this.product = product;
        this.cart = cart;
        this.quantity = quantity;
        this.totalPrice = (this.quantity * this.product.getPrice());
    }


}
