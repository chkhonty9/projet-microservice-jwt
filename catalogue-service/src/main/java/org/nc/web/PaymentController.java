package org.nc.web;

import lombok.AllArgsConstructor;
import org.nc.dto.PaymentDTO;
import org.nc.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@CrossOrigin("*")
@AllArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<PaymentDTO> createPayment(@RequestBody PaymentDTO paymentDTO) {
        System.out.println("Inside createPayment controller  : ");
        PaymentDTO savedPayment = paymentService.save(paymentDTO);
        return ResponseEntity.ok(savedPayment);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentDTO> getPaymentById(@PathVariable Long id) {
        System.out.println("Inside getPaymentByIdController : ");
        PaymentDTO payment = paymentService.findById(id);
        return payment != null ? ResponseEntity.ok(payment) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        System.out.println("Inside getAllPayments controller  : ");
        List<PaymentDTO> payments = paymentService.findAll();
        return ResponseEntity.ok(payments);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        System.out.println("Inside deletePayment controller  : ");
        paymentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}