package org.nc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;


@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class CartItemDTO {

    private String id;
    private int quantity;
    private Date addedAt;
    private double price;
    private Long userId;
    private ProductDTO product;

}
