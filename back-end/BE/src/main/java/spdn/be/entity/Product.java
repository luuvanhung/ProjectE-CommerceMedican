package spdn.be.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Product {
    @Id
    @SequenceGenerator(
            name = "product_sequence",
            sequenceName = "product_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "product_sequence"
    )
    private long productId;
    @NotBlank
    private String productName;
    @NotBlank
    private String description;
    @NotNull
    private Integer price;
    @NotNull
    private Integer quantity;
    @NotNull
    private float width;
    @NotNull
    private float depth;
    @NotNull
    private float height;
    @NotNull
    private float widthMetric;
    @NotNull
    private float depthMetric;
    @NotNull
    private float heightMetric;
    @CreationTimestamp
    private LocalDate createDate;
    @UpdateTimestamp
    private LocalDate updateDate;
    @NotNull
    private  String imageProduct;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "attribute_id", referencedColumnName = "attributeId")
    private Attribute attribute;
    @ManyToOne(targetEntity = SubCategory.class)
    @JoinColumn(name = "subcategory_id")
    public SubCategory subCategory;
}
