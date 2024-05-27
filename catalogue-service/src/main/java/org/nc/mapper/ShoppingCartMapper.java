package org.nc.mapper;

import lombok.AllArgsConstructor;
import org.nc.dto.ShoppingCartDTO;
import org.nc.entity.ShoppingCart;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShoppingCartMapper {
    private CartItemMapper cartItemMapper;

    public ShoppingCartDTO fromShoppingCart(ShoppingCart shoppingCart) {
        System.out.println("ShoppingCartMapper::fromShoppingCart");
        ShoppingCartDTO shoppingCartDTO = new ShoppingCartDTO();
        BeanUtils.copyProperties(shoppingCart, shoppingCartDTO);
        shoppingCartDTO.setCartItems(shoppingCart.getCartItems().stream().map(cartItem -> cartItemMapper.fromCartItem(cartItem)).collect(Collectors.toList()));
        return shoppingCartDTO;
    }

    public ShoppingCart toShoppingCart(ShoppingCartDTO shoppingCartDTO) {
        System.out.println("ShoppingCartMapper::toShoppingCart");
        ShoppingCart shoppingCart = new ShoppingCart();
        BeanUtils.copyProperties(shoppingCartDTO, shoppingCart);
        shoppingCart.setCartItems(shoppingCartDTO.getCartItems().stream().map(cartItem -> cartItemMapper.toCartItem(cartItem)).collect(Collectors.toList()));
        return shoppingCart;
    }
}
