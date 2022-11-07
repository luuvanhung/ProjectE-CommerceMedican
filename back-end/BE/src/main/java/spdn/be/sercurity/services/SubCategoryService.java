package spdn.be.sercurity.services;

import spdn.be.entity.Product;
import spdn.be.entity.SubCategory;

import java.util.List;
import java.util.Optional;

public interface SubCategoryService {
     List<SubCategory> getSubcategory();
     List<Product> getproducts(String name);
     void createSub(SubCategory subCategory);
     SubCategory findSubcategoryById(Long id);
     List<Product> getproductsByIdOfSub(Long id);
}
