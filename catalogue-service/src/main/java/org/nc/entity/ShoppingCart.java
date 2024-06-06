package org.nc.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Document
@Data @AllArgsConstructor @NoArgsConstructor
public class ShoppingCart {
    @Id
    private String id;
    private Long userId;
    private int total;
    private boolean status;
    private Date createdAt;
    private boolean delivered;

    private Collection<CartItem> cartItems = new ArrayList<>();

}
