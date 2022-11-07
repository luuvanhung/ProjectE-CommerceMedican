package spdn.be.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Attribute {
    @Id
    @SequenceGenerator(
            name = "attribute_sequencce",
            sequenceName = "attribute_sequencce"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "attribute_sequencce"
    )
    private Long attributeId;
    @NotBlank
    private String dimensions;
    @NotBlank
    private String dimenstionsMetric;
    @NotNull
    private Integer weight;
    @NotNull
    private Integer weightMetric;
    @NotBlank
    private String electrical;
    @NotBlank
    private String country;


}
