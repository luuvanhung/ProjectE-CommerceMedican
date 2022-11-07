package spdn.be.sercurity.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spdn.be.entity.Product;
import spdn.be.entity.SubCategory;
import spdn.be.repository.SubCategoryRepository;
import spdn.be.sercurity.services.SubCategoryService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SubCategoryServiceImpl implements SubCategoryService {
    @Autowired
    SubCategoryRepository subCategoryRepository;

    public List<SubCategory> getSubcategory() {
        return subCategoryRepository.findAll();
    }

    public List<Product> getproducts(String subCategoryName) {
        List<SubCategory> subCategoryEntity = subCategoryRepository.findAll();
        List<Product> productEntity = new ArrayList<>();
        for (SubCategory i : subCategoryEntity) {
            if (i.getSubCategoryName().equals(subCategoryName)) {
                System.out.println("If Loop");
                for (Product product : i.getProducts()) {
                    productEntity.add(product);
                }
            }
        }
        return productEntity;

    }

    @Override
    public void createSub(SubCategory subCategory) {

        subCategoryRepository.save(subCategory);
    }

    @Override
    public SubCategory findSubcategoryById(Long id) {
        return subCategoryRepository.findById(id).get();
    }

    @Override
    public List<Product> getproductsByIdOfSub(Long id) {
        List<SubCategory> subCategoryEntity = subCategoryRepository.findAll();
        List<Product> productEntity = new ArrayList<>();
        for (SubCategory i : subCategoryEntity) {
            if (i.getSubCategoryId().equals(id)) {
                System.out.println("If Loop");
                for (Product product : i.getProducts()) {
                    productEntity.add(product);
                }
            }
        }
        return productEntity;
    }


}
