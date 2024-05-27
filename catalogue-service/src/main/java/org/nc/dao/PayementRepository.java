package org.nc.dao;

import org.nc.entity.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//@RepositoryRestResource
public interface PayementRepository extends MongoRepository<Payment, Long> {
}
