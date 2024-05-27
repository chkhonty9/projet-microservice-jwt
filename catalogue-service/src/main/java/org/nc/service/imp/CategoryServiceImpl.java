package org.nc.service.imp;

import lombok.AllArgsConstructor;
import org.nc.dao.CategoryRepository;
import org.nc.dto.CategoryDTO;
import org.nc.mapper.CategoryMapper;
import org.nc.service.CategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;
    private CategoryMapper categoryMapper;

    @Override
    public CategoryDTO save(CategoryDTO categoryDTO) {
        System.out.println("Inside save method category service: ");
        return this.categoryMapper.fromCategory(this.categoryRepository.save(this.categoryMapper.toCategory(categoryDTO)));
    }

    @Override
    public List<CategoryDTO> findAll() {
        System.out.println("Inside findAll method category service: ");
        return this.categoryRepository.findAll().stream().map(category -> this.categoryMapper.fromCategory(category)).toList();
    }

    @Override
    public CategoryDTO findOne(String id) {
        System.out.println("Inside findOne method category service: ");
        return this.categoryMapper.fromCategory(this.categoryRepository.findById(id).orElse(null));
    }

    @Override
    public void delete(String id) {
        System.out.println("Inside delete method category service: ");
        this.categoryRepository.deleteById(id);
    }

    @Override
    public CategoryDTO findByName(String categoryName) {
        System.out.println("Inside findByName method category service: ");
        return this.categoryMapper.fromCategory(this.categoryRepository.findByName(categoryName));
    }
}
