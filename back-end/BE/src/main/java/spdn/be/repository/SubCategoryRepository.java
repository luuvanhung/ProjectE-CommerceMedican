package spdn.be.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import spdn.be.entity.SubCategory;
@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {
    SubCategory findBySubCategoryName(String subCategoryName);

}
