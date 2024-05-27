package org.nc.web;

import lombok.AllArgsConstructor;
import org.nc.dto.CartItemDTO;
import org.nc.service.CartItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cartItems")
@CrossOrigin("*")
@AllArgsConstructor
public class CartItemController {

    private final CartItemService cartItemService;

    @PostMapping
    public ResponseEntity<CartItemDTO> createCartItem(@RequestBody CartItemDTO cartItemDTO) {
        System.out.println("Inside createCartItem Cart item controller : ");
        CartItemDTO savedCartItem = cartItemService.save(cartItemDTO);
        return ResponseEntity.ok(savedCartItem);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartItemDTO> getCartItemById(@PathVariable String id) {
        System.out.println("Inside getCartItemById Cart item controller : ");
        CartItemDTO cartItem = cartItemService.findOne(id);
        return cartItem != null ? ResponseEntity.ok(cartItem) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<CartItemDTO>> getAllCartItems() {
        System.out.println("Inside getAllCartItems Cart item controller : ");
        List<CartItemDTO> cartItems = cartItemService.findAll();
        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable String id) {
        System.out.println("Inside deleteCartItem Cart item controller : ");
        cartItemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}