package org.nc.service.imp;

import lombok.AllArgsConstructor;
import org.nc.dao.PayementRepository;
import org.nc.dto.PaymentDTO;
import org.nc.mapper.PaymentMapper;
import org.nc.service.PaymentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private PayementRepository payementRepository;
    private PaymentMapper payementMapper;

    @Override
    public PaymentDTO save(PaymentDTO payment) {
        System.out.println("Inside save method of PaymentService : ");
        return this.payementMapper.fromPayment(this.payementRepository.save(this.payementMapper.toPayment(payment)));
    }

    @Override
    public PaymentDTO findById(Long id) {
        System.out.println("Inside findById method of PaymentService : ");
        return this.payementMapper.fromPayment(this.payementRepository.findById(id).orElse(null));
    }

    @Override
    public List<PaymentDTO> findAll() {
        System.out.println("Inside findAll method of PaymentService : ");
        return this.payementRepository.findAll().stream().map(payment -> this.payementMapper.fromPayment(payment)).toList();
    }

    @Override
    public void delete(Long id) {
        System.out.println("Inside delete method of PaymentService : ");
        this.payementRepository.deleteById(id);
    }
}
