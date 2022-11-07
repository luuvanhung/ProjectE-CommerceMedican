package spdn.be.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "user"})
@Table(name = "address")
public class Address {
    private static final long serialVersionUID = -4988491775034367092L;


    @Id
    @SequenceGenerator(

            name = "address_sequence",
            sequenceName = "address_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "address_sequence"
    )
    private Long addressId;


    @Column(nullable = false, length = 120)
    private String lane;

    @Column(nullable = false, length = 120)
    private String street;

    @Column(nullable = false, length = 120)
    private String city;

    @Column(nullable = false, length = 15)
    private String zip;

    @Column(nullable = false, length = 20)
    private String type;

    @UpdateTimestamp
    private LocalDateTime updatedTime;
    @CreationTimestamp
    private LocalDateTime createTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private User user;
}
