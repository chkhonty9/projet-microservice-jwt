package org.nc.dao;

import org.nc.entity.CartItem;
import org.nc.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

//@RepositoryRestResource
public interface CartItemRepository extends MongoRepository<CartItem, String> {
    List<CartItem> findByUserId(Long userId);
    List<CartItem> findByProduct(Product product);
}
