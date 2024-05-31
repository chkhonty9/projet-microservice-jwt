package org.nc.dao;

import org.nc.entity.ShoppingCart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

//@RepositoryRestResource
public interface ShoppingCartRepository extends MongoRepository<ShoppingCart, String> {
    ShoppingCart findByUserIdAndStatusIsFalse(Long userId);
    List<ShoppingCart> findByUserId(Long userId);
}
