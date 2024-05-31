package org.nc.service;


import org.nc.dto.CategoryDTO;
import org.nc.dto.ProductDTO;

import java.util.List;

public interface ProductService {
    ProductDTO save(ProductDTO product);
    List<ProductDTO> findAll();
    ProductDTO findOne(String id);
    void delete(String id);
    List<ProductDTO> findByName(String name);
    List<ProductDTO> findByCategory(CategoryDTO categoryDTO);
    List<ProductDTO> findByNameContaining(String name);
    List<ProductDTO> findByAvailableIsFalse();
    List<ProductDTO> findByPromotionIsTrue();

}
