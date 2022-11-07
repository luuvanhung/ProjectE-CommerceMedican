package spdn.be.sercurity.services.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import spdn.be.dto.ProductDto;
import spdn.be.entity.Product;
import spdn.be.repository.AttributeRepository;
import spdn.be.repository.ProductRepository;
import spdn.be.repository.SubCategoryRepository;
import spdn.be.sercurity.services.ProductService;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private AttributeRepository attributeRepository;
    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Override
    public Page<Product> findAllProduct(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public void addProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public ProductDto updateProduct(ProductDto body, Long id) {
        Product product = new Product();
        BeanUtils.copyProperties(body, product);
        Product productUpdate = productRepository.findById(id).get();
        productUpdate.setProductName(product.getProductName());
        productUpdate.setPrice(body.getPrice());
        productUpdate.setDescription(body.getDescription());
        productUpdate.setQuantity(body.getQuantity());
        productUpdate.setWidth(body.getWidth());
        productUpdate.setWidthMetric(body.getWidthMetric());
        productUpdate.setDepth(body.getDepth());
        productUpdate.setDepthMetric(body.getDepthMetric());
        productUpdate.setHeight(body.getHeight());
        productUpdate.setHeightMetric(body.getHeightMetric());
        productUpdate.setAttribute(body.getAttribute());
        productUpdate.setSubCategory(body.getSubCategory());
        productRepository.save(productUpdate);
        ProductDto returnValue = new ProductDto();
        BeanUtils.copyProperties(productUpdate, returnValue);
        return returnValue;
//aaa


    }


    @Override
    public Product findProductById(Long id) {
        return productRepository.findById(id).get();

    }

    @Override
    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }
    @Override
    public List<Product> listAll(String keyword) {
        if (keyword != null) {
            return productRepository.search(keyword);
        }
        return productRepository.findAll();
    }
}
