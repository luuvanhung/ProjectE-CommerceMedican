package spdn.be.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;

    private double totalAmount;

    private String cartStatus;

    @OneToOne
    @JoinColumn(name = "id")
    @JsonIgnore
    private User user;


    @OneToMany(mappedBy = "cart")

    private List<CartItem> cartItemList;



    public double getTotalAmount()
    {
        totalAmount=0.0;
        for(CartItem cartItem:cartItemList){
            totalAmount +=  cartItem.getTotalPrice();
        }
        return totalAmount;
    }


}
