package org.nc.dao;

import org.nc.entity.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

//@RepositoryRestResource
public interface PaymentRepository extends MongoRepository<Payment, String> {
}
