package spdn.be.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import spdn.be.entity.Address;

import java.util.Optional;

@Repository
public interface AddressRepository  extends JpaRepository<Address,Long> {
    Optional<Address> findByAddressId(Long shippingAddress);
}
