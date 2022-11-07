package spdn.be.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import spdn.be.entity.Role;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String address;
    private String phoneNumber;
    private Set<Role> roles = new HashSet<>();
    private String password;
    private List<AddressDto> addressDtos;
}
