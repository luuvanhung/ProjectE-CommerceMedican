package spdn.be.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import spdn.be.entity.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {


    @Query("SELECT p FROM Product p WHERE CONCAT(p.productName, ' ', p.description, ' ', p.price, ' ', p.price) LIKE %?1%")
    public List<Product> search(String keyword);
    Product findByProductId(Long Id);
}
