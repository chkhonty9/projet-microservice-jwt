package org.nc.mapper;

import lombok.AllArgsConstructor;
import org.nc.dto.CategoryDTO;
import org.nc.entity.Category;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class CategoryMapper {

    private final ProductMapper  productMapper;
    public CategoryMapper(@Lazy ProductMapper productMapper) {
        this.productMapper = productMapper;
    }

    public CategoryDTO fromCategory(Category category) {
        System.out.println("CategoryMapper::fromCategory");
        CategoryDTO categoryDTO = new CategoryDTO();
        BeanUtils.copyProperties(category, categoryDTO);
        categoryDTO.setProducts(category.getProducts().stream().map(product -> productMapper.fromProduct(product)).collect(Collectors.toList()));
        return categoryDTO;
    }

    public Category toCategory(CategoryDTO categoryDTO) {
        System.out.println("CategoryMapper::toCategory");
        Category category = new Category();
        BeanUtils.copyProperties(categoryDTO, category);
        category.setProducts(categoryDTO.getProducts().stream().map(product -> productMapper.toProduct(product)).collect(Collectors.toList()));
        return category;
    }

}
