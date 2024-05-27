package org.nc.mapper;

import lombok.AllArgsConstructor;
import org.nc.dto.PaymentDTO;
import org.nc.entity.Payment;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PaymentMapper {

    private ShoppingCartMapper shoppingCartMapper;

    public PaymentDTO fromPayment(Payment payment) {
        System.out.println("paymentMapper::fromPayment");
        PaymentDTO paymentDTO = new PaymentDTO();
        BeanUtils.copyProperties(payment, paymentDTO);
        paymentDTO.setShoppingCart(shoppingCartMapper.fromShoppingCart(payment.getShoppingCart()));
        return paymentDTO;
    }

    public Payment toPayment(PaymentDTO paymentDTO) {
        System.out.println("paymentMapper::toPayment");
        Payment payment = new Payment();
        BeanUtils.copyProperties(paymentDTO, payment);
        payment.setShoppingCart(shoppingCartMapper.toShoppingCart(paymentDTO.getShoppingCart()));
        return payment;
    }
}
