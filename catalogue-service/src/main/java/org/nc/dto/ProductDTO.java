package org.nc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private String id;
    private String name;
    private double price;
    private boolean promotion;
    private boolean available;
    private String description;
    private String image;
    private double stock;

    private CategoryDTO category;

}
