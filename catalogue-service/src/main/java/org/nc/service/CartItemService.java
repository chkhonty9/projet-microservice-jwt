package org.nc.service;

import org.nc.dto.CartItemDTO;
import org.nc.dto.ProductDTO;

import java.util.List;

public interface CartItemService {
    CartItemDTO save(CartItemDTO cartItemDTO);
    CartItemDTO findOne(String id);
    List<CartItemDTO> findAll();
    List<CartItemDTO> findByUserId(Long userId);
    List<CartItemDTO> findByProduct(ProductDTO productDTO);
    void delete(String id);
}
