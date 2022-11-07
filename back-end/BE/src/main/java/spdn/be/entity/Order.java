package spdn.be.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @UpdateTimestamp
    private LocalDateTime updatedTime;

    @CreationTimestamp
    private LocalDateTime createTime;

    @Column(nullable = false, length = 120)
    private String orderStatus;

    @Column(nullable = false)
    private double orderAmount;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "billing_address")
    private Address billingAddress;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "shipping_address")
    private Address shippingAddress;

    @OneToOne
    @JoinColumn(name = "cart_id")
    private Cart cartEntity;
}
