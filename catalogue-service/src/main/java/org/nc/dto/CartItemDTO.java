package org.nc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;


@Data @AllArgsConstructor @NoArgsConstructor
public class CartItemDTO {

    private String id;
    private int quantity;
    private Date addedAt;
    private double price;


    private ProductDTO product;

}
