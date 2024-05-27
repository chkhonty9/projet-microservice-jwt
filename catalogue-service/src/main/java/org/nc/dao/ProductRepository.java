package org.nc.dao;

import org.nc.entity.Category;
import org.nc.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

//@RepositoryRestResource
public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByName(String name);
    List<Product> findByCategory(Category category);
    List<Product> findByNameContaining(String name);

}
