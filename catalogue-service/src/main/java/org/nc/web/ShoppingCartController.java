package org.nc.web;

import lombok.AllArgsConstructor;
import org.nc.dto.ShoppingCartDTO;
import org.nc.service.ShoppingCartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shoppingCarts")
@CrossOrigin("*")
@AllArgsConstructor
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    @PostMapping
    public ResponseEntity<ShoppingCartDTO> createShoppingCart(@RequestBody ShoppingCartDTO shoppingCartDTO) {
        System.out.println("inside createShoppingCart controller: ");
        ShoppingCartDTO savedShoppingCart = shoppingCartService.save(shoppingCartDTO);
        return ResponseEntity.ok(savedShoppingCart);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShoppingCartDTO> getShoppingCartById(@PathVariable String id) {
        System.out.println("inside getShoppingCart controller: ");
        ShoppingCartDTO shoppingCart = shoppingCartService.findOne(id);
        return shoppingCart != null ? ResponseEntity.ok(shoppingCart) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<ShoppingCartDTO>> getAllShoppingCarts() {
        System.out.println("inside getAllShoppingCarts controller: ");
        List<ShoppingCartDTO> shoppingCarts = shoppingCartService.findAll();
        return ResponseEntity.ok(shoppingCarts);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShoppingCart(@PathVariable String id) {
        System.out.println("inside deleteShoppingCart controller: ");
        shoppingCartService.delete(id);
        return ResponseEntity.noContent().build();
    }
}