package spdn.be.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import spdn.be.entity.Attribute;

@Repository
public interface AttributeRepository extends JpaRepository<Attribute, Long> {
}
