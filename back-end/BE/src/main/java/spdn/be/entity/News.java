package spdn.be.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class News {
    @Id
    @SequenceGenerator(
            name = "News_sequence",
            sequenceName = "News_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "News_sequence"
    )
    private long NewsId;
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotBlank
    private String Nameurl;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String imageurl;

    public News(String content, String title, String Nameurl, String imageurl) {
        this.content=content;
        this.title=title;
        this.Nameurl=Nameurl;
        this.imageurl=imageurl;
    }

}
