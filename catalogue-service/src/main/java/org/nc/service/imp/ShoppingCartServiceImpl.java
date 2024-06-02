package org.nc.service.imp;

import lombok.AllArgsConstructor;
import org.nc.dao.ShoppingCartRepository;
import org.nc.dto.ShoppingCartDTO;
import org.nc.mapper.ShoppingCartMapper;
import org.nc.service.ShoppingCartService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private ShoppingCartRepository shoppingCartRepository;
    private ShoppingCartMapper shoppingCartMapper;

    @Override
    public ShoppingCartDTO save(ShoppingCartDTO shoppingCartDTO) {
        System.out.println("Inside save method of ShoppingCartService :");
        System.out.println("cart : " + shoppingCartDTO.toString());
        return this.shoppingCartMapper.fromShoppingCart(this.shoppingCartRepository.save(this.shoppingCartMapper.toShoppingCart(shoppingCartDTO)));
    }

    @Override
    public List<ShoppingCartDTO> findAll() {
        System.out.println("Inside findAll method of ShoppingCartService :");
        return this.shoppingCartRepository.findAll().stream().map(shoppingCart -> this.shoppingCartMapper.fromShoppingCart(shoppingCart)).toList();
    }

    @Override
    public List<ShoppingCartDTO> findByUserId(Long userId) {
        return this.shoppingCartRepository.findByUserId(userId).stream().map(shoppingCart -> this.shoppingCartMapper.fromShoppingCart(shoppingCart)).toList();
    }

    @Override
    public ShoppingCartDTO findOne(String id) {
        System.out.println("Inside findOne method of ShoppingCartService :");
        return this.shoppingCartMapper.fromShoppingCart(this.shoppingCartRepository.findById(id).orElse(null));
    }

    @Override
    public ShoppingCartDTO findByUserIdAndStatusIsFalse(Long userId) {
        return this.shoppingCartMapper.fromShoppingCart(this.shoppingCartRepository.findByUserIdAndStatusIsFalse(userId));
    }

    @Override
    public void delete(String id) {
        System.out.println("Inside delete method of ShoppingCartService :");
        this.shoppingCartRepository.deleteById(id);
    }
}
