package org.nc.service;

import org.nc.dto.ShoppingCartDTO;

import java.util.List;

public interface ShoppingCartService {
    ShoppingCartDTO save(ShoppingCartDTO shoppingCartDTO);
    List<ShoppingCartDTO> findAll();
    ShoppingCartDTO findOne(String id);
    void delete(String id);
}
