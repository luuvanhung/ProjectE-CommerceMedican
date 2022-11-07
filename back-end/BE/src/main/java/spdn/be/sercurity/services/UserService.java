package spdn.be.sercurity.services;


import spdn.be.dto.UserDto;
import spdn.be.payload.request.AddressRequest;
import spdn.be.payload.response.AddressResponse;
import spdn.be.payload.response.UserInfoResponse;

public interface UserService {
    UserDto updateUser (UserDto user , Long id);
    AddressResponse addAddress(Long id , AddressRequest addressRequest);
    void changeUserPassword1(String   name, String newpassword,String oldpassword);
}
