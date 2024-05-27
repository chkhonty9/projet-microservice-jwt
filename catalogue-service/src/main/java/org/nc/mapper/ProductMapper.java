package org.nc.mapper;

import lombok.AllArgsConstructor;
import org.nc.dto.ProductDTO;
import org.nc.entity.Product;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class ProductMapper {

    private final CategoryMapper categoryMapper;

    public ProductMapper(@Lazy CategoryMapper categoryMapper) {
        this.categoryMapper = categoryMapper;
    }

    public ProductDTO fromProduct(Product product) {
        System.out.println("ProductMapper::fromProduct");
        ProductDTO productDTO = new ProductDTO();
        BeanUtils.copyProperties(product, productDTO);
        productDTO.setCategory(categoryMapper.fromCategory(product.getCategory()));
        return productDTO;
    }

    public Product toProduct(ProductDTO productDTO) {
        System.out.println("ProductMapper::toProduct");
        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product);
        product.setCategory(categoryMapper.toCategory(productDTO.getCategory()));
        return product;
    }
}
