package spdn.be.sercurity.services;

import org.springframework.stereotype.Service;
import spdn.be.entity.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getAllCategory();
    void createCate(Category category);
}
