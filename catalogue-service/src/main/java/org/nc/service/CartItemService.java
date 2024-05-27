package org.nc.service;

import org.nc.dto.CartItemDTO;

import java.util.List;

public interface CartItemService {
    CartItemDTO save(CartItemDTO cartItemDTO);
    CartItemDTO findOne(String id);
    List<CartItemDTO> findAll();
    void delete(String id);
}
