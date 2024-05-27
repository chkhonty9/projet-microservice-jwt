package org.nc.service;

import org.nc.dto.CategoryDTO;

import java.util.List;


public interface CategoryService {
    CategoryDTO save(CategoryDTO categoryDTO);
    List<CategoryDTO> findAll();
    CategoryDTO findOne(String id);
    void delete(String id);
    CategoryDTO findByName(String categoryName);
}
