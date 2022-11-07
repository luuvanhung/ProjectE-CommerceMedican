package spdn.be.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import spdn.be.entity.CartItem;

import javax.transaction.Transactional;


@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Long> {

    @Transactional
    @Modifying
    @Query(value = "delete from cartitem ci where ci.cart_id =?1 and ci.product_id=?2",nativeQuery = true)
    void deleteAProduct(Long cartId,Long productId);

    @Query(value = "select quantity from cartitem ci where ci.product_id=?1",nativeQuery = true)
    Integer getQuantity(Long productId);
}
