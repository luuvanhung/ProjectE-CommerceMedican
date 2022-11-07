package spdn.be.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import spdn.be.entity.Cart;

import java.util.List;
import java.util.Optional;


@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {
    @Query(value = "select * from cart c where c.id = ?1 and  c.cart_status=?2",nativeQuery = true)
    Cart getCartByUserId(Long id,String status);

    @Query(value = "select * from cart c where c.id = ?1 and c.cart_status = ?2",nativeQuery = true)
    List<Cart> findByUserIdAndStatus(Long id, String status);

    @Query(value = "select * from cart c where c.id = ?1 and c.cart_status = ?2",nativeQuery = true)
    Optional<Cart> findByUserId(Long id, String status);

    @Query(value = "select * from cart c where c.id=?1 and c.cart_status=?2 ",nativeQuery = true)
    Optional<Cart> findCartById(Long id,String status);
}
