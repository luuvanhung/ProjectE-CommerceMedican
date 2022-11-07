package spdn.be.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDto {

    private static final long serialVersionUID= 7972379581449181725L;

    private Long addressId;
    private String lane;
    private  String street;
    private String city;
    private String zip;
    private String type;

    private UserDto user;
}
