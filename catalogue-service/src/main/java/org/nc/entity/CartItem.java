package org.nc.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data @AllArgsConstructor @NoArgsConstructor
public class CartItem {
    @Id
    private String id;
    private int quantity;
    private Date addedAt;
    private double price;
    private Long userId;

    @DBRef
    private Product product;

}
