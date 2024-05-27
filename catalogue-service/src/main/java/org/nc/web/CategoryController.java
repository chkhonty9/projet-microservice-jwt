package org.nc.web;

import lombok.AllArgsConstructor;
import org.nc.dto.CategoryDTO;
import org.nc.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO) {
        System.out.println("createCategory called of category controller :");
        CategoryDTO savedCategory = categoryService.save(categoryDTO);
        return ResponseEntity.ok(savedCategory);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        System.out.println("getAllCategories called of category controller :");
        List<CategoryDTO> categories = categoryService.findAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable String id) {
        System.out.println("getCategoryById called of category controller :");
        CategoryDTO category = categoryService.findOne(id);
        return category != null ? ResponseEntity.ok(category) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable String id) {
        System.out.println("deleteCategory called of category controller :");
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<CategoryDTO> getCategoryByName(@RequestParam String name) {
        System.out.println("getCategoryByName called of category controller :");
        CategoryDTO category = categoryService.findByName(name);
        return category != null ? ResponseEntity.ok(category) : ResponseEntity.notFound().build();
    }
}