package org.nc.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data @AllArgsConstructor @NoArgsConstructor @ToString(exclude = "category")
public class Product {
    @Id
    private String id;
    private String name;
    private double price;
    private boolean promotion;
    private boolean available;
    private String description;
    private String image;
    private double stock;

    @DBRef
    private Category category;
}
