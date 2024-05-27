package org.nc.dao;

import org.nc.entity.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//@RepositoryRestResource
public interface CartItemRepository extends MongoRepository<CartItem, String> {

}
