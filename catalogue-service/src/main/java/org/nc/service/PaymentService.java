package org.nc.service;

import org.nc.dto.PaymentDTO;

import java.util.List;

public interface PaymentService {
    PaymentDTO save(PaymentDTO payment);
    PaymentDTO findById(String  id);
    List<PaymentDTO> findAll();
    void delete(String id);
}
