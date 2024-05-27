package org.nc.mapper;

import lombok.AllArgsConstructor;
import org.nc.dto.CartItemDTO;
import org.nc.entity.CartItem;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CartItemMapper {
    private ProductMapper productMapper;

    public CartItemDTO fromCartItem(CartItem cartItem) {
        System.out.println("CartItemMapper::fromCartItem");
        CartItemDTO cartItemDTO = new CartItemDTO();
        BeanUtils.copyProperties(cartItem, cartItemDTO);
        cartItemDTO.setProduct(productMapper.fromProduct(cartItem.getProduct()));
        return cartItemDTO;
    }

    public CartItem toCartItem(CartItemDTO cartItemDTO) {
        System.out.println("CartItemMapper::toCartItem");
        CartItem cartItem = new CartItem();
        BeanUtils.copyProperties(cartItemDTO, cartItem);
        cartItem.setProduct(productMapper.toProduct(cartItemDTO.getProduct()));
        return cartItem;
    }
}
