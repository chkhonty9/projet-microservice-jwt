package org.nc.service;

import org.nc.dto.ProductDTO;

import java.util.List;

public interface Recommendation {
    List<ProductDTO> recommendations(Long id);
}
