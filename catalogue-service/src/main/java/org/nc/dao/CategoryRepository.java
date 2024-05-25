package org.nc.dao;

import org.nc.entity.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface CategoryRepository extends MongoRepository<Category, String> {
    List<Category> findByName(String categoryName);
}
