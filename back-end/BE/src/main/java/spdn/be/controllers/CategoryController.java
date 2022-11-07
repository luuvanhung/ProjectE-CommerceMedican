package spdn.be.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spdn.be.entity.Category;
import spdn.be.sercurity.services.CategoryService;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @GetMapping("/get-categorys")
    public List<Category> get(){
        return categoryService.getAllCategory();

    }
    @PostMapping("/create-category")
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        categoryService.createCate(category);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

}
