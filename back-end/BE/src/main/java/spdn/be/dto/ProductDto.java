package spdn.be.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import spdn.be.entity.Attribute;
import spdn.be.entity.SubCategory;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDto {
    private Long productId;
    private String productName;
    private String description;
    private Integer price;
    private Integer quantity;
    private Attribute attribute;
    private float width;

    private float depth;

    private float height;

    private float widthMetric;

    private float depthMetric;

    private float heightMetric;
    private SubCategory subCategory;
}
