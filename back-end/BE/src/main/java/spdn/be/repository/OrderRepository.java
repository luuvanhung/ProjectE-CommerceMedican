package spdn.be.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import spdn.be.entity.Order;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    Optional<Order> findByOrderId(Long id);

    @Query(value = "select * from orders o where o.cart_id = ?1", nativeQuery = true)
    Order findByCartId(long cartId);

    @Query(value = "select * from orders o where o.cart_id = ?1 and o.order_status = ?2", nativeQuery = true)
    Order findBycartIdandStatus(long cartId, String status);
}
