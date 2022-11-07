package spdn.be.sercurity.services.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import spdn.be.dto.AddressDto;
import spdn.be.dto.UserDto;
import spdn.be.entity.Address;
import spdn.be.entity.ERole;
import spdn.be.entity.Role;
import spdn.be.entity.User;
import spdn.be.payload.request.AddressRequest;
import spdn.be.payload.response.AddressResponse;
import spdn.be.repository.AddressRepository;
import spdn.be.repository.RoleRepository;
import spdn.be.repository.UserRepository;
import spdn.be.sercurity.services.UserService;

import javax.validation.constraints.Null;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AddressRepository addressRepository;

    @Override
    public UserDto updateUser(UserDto body, Long id) {
        User user = new User();
        BeanUtils.copyProperties(body, user);
        User userUpdate = userRepository.findById(id).get();
        userUpdate.setAddress(user.getAddress());
        userUpdate.setEmail(user.getEmail());
        userUpdate.setFullName(user.getFullName());
        if (user.getPassword()== null){

            userUpdate.setPassword(encoder.encode(userUpdate.getPassword()));

        }else {
            userUpdate.setPassword(encoder.encode(user.getPassword()));
        }

        userUpdate.setRoles(userUpdate.getRoles());

        userUpdate.setPhoneNumber(user.getPhoneNumber());

        userRepository.save(userUpdate);
        UserDto returnValue = new UserDto();
        BeanUtils.copyProperties(userUpdate, returnValue);
        return returnValue;
    }

    @Override
    public AddressResponse addAddress(Long id, AddressRequest addressRequest) {
        AddressResponse returnValue=new AddressResponse();
        User userEntity=new User();
        userEntity.setId(id);
        AddressDto addressDto=new AddressDto();
        BeanUtils.copyProperties(addressRequest,addressDto);
        Address addressEntity=new Address();
        BeanUtils.copyProperties(addressDto,addressEntity);
        addressEntity.setUser(userEntity);
        Address storedAddress=addressRepository.save(addressEntity);
        BeanUtils.copyProperties(storedAddress,addressDto);
        BeanUtils.copyProperties(addressDto,returnValue);
        return returnValue;
    }

    @Override
    public void changeUserPassword1(String name, String newpassword, String oldpassword) {
        User user  = userRepository.findByUsername(name)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + name));

        if(encoder.matches(oldpassword,user.getPassword())){
            user.setPassword(encoder.encode(newpassword));
        }


        userRepository.save(user);
    }
    }

