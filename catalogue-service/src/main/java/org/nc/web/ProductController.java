package org.nc.web;

import lombok.AllArgsConstructor;
import org.nc.dto.CategoryDTO;
import org.nc.dto.ProductDTO;
import org.nc.service.CategoryService;
import org.nc.service.ProductService;
import org.nc.service.Recommendation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("products")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final Recommendation recommendation;

    @PostMapping("/save")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        System.out.println("inside createProduct controller : ");
        ProductDTO savedProduct = productService.save(productDTO);
        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        System.out.println("inside getAllProducts controller : ");
        List<ProductDTO> products = productService.findAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable String id) {
        System.out.println("inside getProductById controller : ");
        ProductDTO product = productService.findOne(id);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        System.out.println("inside deleteProduct controller : ");
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> getProductsByName(@RequestParam String name) {
        System.out.println("inside getProductsByName controller : ");
        List<ProductDTO> products = productService.findByName(name);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/byCategory/{categoryId}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable String categoryId) {
        System.out.println("inside getProductsByCategory controller : ");
        CategoryDTO category = categoryService.findOne(categoryId);
        if (category == null) {
            return ResponseEntity.notFound().build();
        }
        List<ProductDTO> products = productService.findByCategory(category);
        return ResponseEntity.ok(products);
    }
    @GetMapping("/contain/{name}")
    public ResponseEntity<List<ProductDTO>> getProductsByNameContaining(@PathVariable String name) {
        System.out.println("inside getProducts by name controller : ");
        return ResponseEntity.ok(productService.findByNameContaining(name));
    }
    @GetMapping("/epuise")
    public ResponseEntity<List<ProductDTO>> getProductsEpuise() {
        System.out.println("inside getProducts not available controller : ");
        return ResponseEntity.ok(productService.findByAvailableIsFalse());
    }
    @GetMapping("/promo")
    public ResponseEntity<List<ProductDTO>> getProductsPromo() {
        System.out.println("inside getProducts promo controller : ");
        return ResponseEntity.ok(productService.findByPromotionIsTrue());
    }
    @GetMapping("/recommendation/{id}")
    public ResponseEntity<List<ProductDTO>> getProductsRecommendation(@PathVariable Long id) {
        System.out.println("inside getProducts recommendation controller : ");
        return ResponseEntity.ok(recommendation.recommendations(id));
    }
}