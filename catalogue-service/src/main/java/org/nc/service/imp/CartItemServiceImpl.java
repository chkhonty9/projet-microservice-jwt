package org.nc.service.imp;

import lombok.AllArgsConstructor;
import org.nc.dao.CartItemRepository;
import org.nc.dto.CartItemDTO;
import org.nc.mapper.CartItemMapper;
import org.nc.service.CartItemService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class CartItemServiceImpl implements CartItemService {

    private CartItemRepository cartItemRepository;
    private CartItemMapper cartItemMapper;

    @Override
    public CartItemDTO save(CartItemDTO cartItemDTO) {
        System.out.println("Inside save method cart item service: ");
        return this.cartItemMapper.fromCartItem(this.cartItemRepository.save(cartItemMapper.toCartItem(cartItemDTO)));
    }

    @Override
    public CartItemDTO findOne(String id) {
        System.out.println("Inside findOne method cart item service: ");
        return this.cartItemMapper.fromCartItem(this.cartItemRepository.findById(id).orElse(null));
    }

    @Override
    public List<CartItemDTO> findAll() {
        System.out.println("Inside findAll method cart item service: ");
        return this.cartItemRepository.findAll().stream().map(cartItem -> this.cartItemMapper.fromCartItem(cartItem)).toList();
    }

    @Override
    public void delete(String id) {
        System.out.println("Inside delete method cart item service: ");
        this.cartItemRepository.deleteById(id);
    }
}
