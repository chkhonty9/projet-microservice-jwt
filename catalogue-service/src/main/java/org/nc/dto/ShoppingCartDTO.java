package org.nc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;


@Data @AllArgsConstructor @NoArgsConstructor
public class ShoppingCartDTO {

    private String id;
    private Long userId;
    private int total;
    private boolean status;
    private Date createdAt;

    private Collection<CartItemDTO> cartItems = new ArrayList<>();

}
