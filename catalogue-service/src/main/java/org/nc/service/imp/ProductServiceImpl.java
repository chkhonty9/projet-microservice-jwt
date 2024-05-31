package org.nc.service.imp;

import lombok.AllArgsConstructor;
import org.nc.dao.ProductRepository;
import org.nc.dto.CategoryDTO;
import org.nc.dto.ProductDTO;
import org.nc.mapper.CategoryMapper;
import org.nc.mapper.ProductMapper;
import org.nc.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;
    private ProductMapper productMapper;
    private CategoryMapper categoryMapper;

    @Override
    public ProductDTO save(ProductDTO product) {
        System.out.println("Inside save method of ProductServiceImpl : ");
        return this.productMapper.fromProduct(this.productRepository.save(productMapper.toProduct(product)));
    }

    @Override
    public List<ProductDTO> findAll() {
        System.out.println("Inside findAll method of ProductServiceImpl : ");
        return this.productRepository.findAll().stream().map(product -> productMapper.fromProduct(product)).toList();
    }

    @Override
    public ProductDTO findOne(String id) {
        System.out.println("Inside findOne method of ProductServiceImpl : ");
        return this.productMapper.fromProduct(this.productRepository.findById(id).orElse(null));
    }

    @Override
    public void delete(String id) {
        System.out.println("Inside delete method of ProductServiceImpl : ");
        this.productRepository.deleteById(id);
    }

    @Override
    public List<ProductDTO> findByName(String name) {
        System.out.println("Inside findByName method of ProductServiceImpl : ");
        return this.productRepository.findByName(name).stream().map(product -> productMapper.fromProduct(product)).toList();
    }

    @Override
    public List<ProductDTO> findByCategory(CategoryDTO categoryDTO) {
        System.out.println("Inside findByCategory method of ProductServiceImpl : ");
        return this.productRepository.findByCategory(this.categoryMapper.toCategory(categoryDTO)).stream().map(product -> productMapper.fromProduct(product)).toList();
    }

    @Override
    public List<ProductDTO> findByNameContaining(String name) {
        return this.productRepository.findByNameContainingIgnoreCase(name).stream().map(product -> productMapper.fromProduct(product)).toList();
    }

    @Override
    public List<ProductDTO> findByAvailableIsFalse() {
        return this.productRepository.findByAvailableIsFalse().stream().map(product -> productMapper.fromProduct(product)).toList();
    }

    @Override
    public List<ProductDTO> findByPromotionIsTrue() {
        return this.productRepository.findByPromotionIsTrue().stream().map(product -> productMapper.fromProduct(product)).toList();
    }
}
