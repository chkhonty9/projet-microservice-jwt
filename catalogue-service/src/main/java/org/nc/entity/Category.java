package org.nc.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Collection;

@Document
@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class Category {
    @Id
    private String id;
    @Indexed(unique = true)
    private String name;
    private String description;
    private String image;

    @DBRef
    private Collection<Product> products = new ArrayList<>();
}
