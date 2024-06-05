package org.nc.service.imp;

import lombok.AllArgsConstructor;
import org.nc.dao.CartItemRepository;
import org.nc.dao.ProductRepository;
import org.nc.dto.CartItemDTO;
import org.nc.dto.CategoryDTO;
import org.nc.dto.ProductDTO;
import org.nc.mapper.CartItemMapper;
import org.nc.mapper.ProductMapper;
import org.nc.service.CartItemService;
import org.nc.service.ProductService;
import org.nc.service.Recommendation;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class RecommendationImpl implements Recommendation {
    private CartItemService cartItemService;
    private ProductService productService;



    @Override
    public List<ProductDTO> recommendations(Long id) {
        List<CartItemDTO> items = this.cartItemService.findByUserId(id);
        Set<CategoryDTO> categories = items.stream().map(item -> item.getProduct().getCategory()).collect(Collectors.toSet());

        Set<ProductDTO> products = new HashSet<>(Set.of());
        for(CategoryDTO c : categories){
            List<ProductDTO> productList = this.productService.findByCategory(c);
            products.addAll(productList);
        }


        return products.stream().toList();
    }
}
