package org.nc.service;

import org.nc.dto.ShoppingCartDTO;

import java.util.List;

public interface ShoppingCartService {
    ShoppingCartDTO save(ShoppingCartDTO shoppingCartDTO);
    List<ShoppingCartDTO> findAll();
    List<ShoppingCartDTO> findByUserId(Long userId);
    ShoppingCartDTO findOne(String id);
    ShoppingCartDTO findByUserIdAndStatusIsFalse(Long userId);
    void delete(String id);
}
