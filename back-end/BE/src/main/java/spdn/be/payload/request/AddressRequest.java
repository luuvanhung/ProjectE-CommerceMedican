package spdn.be.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class AddressRequest {
    private String lane;
    private String city;
    private String zip;
    private String type;
    private String street;
}
