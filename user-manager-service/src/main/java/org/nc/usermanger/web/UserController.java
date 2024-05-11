package org.nc.usermanger.web;

import lombok.AllArgsConstructor;
import org.nc.usermanger.dto.RoleDTO;
import org.nc.usermanger.dto.UserDTO;
import org.nc.usermanger.service.AccountService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class UserController {
    //@Autowired
    private AccountService accountService;

    @PostMapping("/register")
    public UserDTO SignUp(@RequestBody RegistrationForm data){
        String password = data.getPassword();
        String repassword = data.getRepassword();
        if(!password.equals(repassword))
            throw new RuntimeException("You must confirm your password");

        UserDTO user = new UserDTO();
        BeanUtils.copyProperties(data, user);
        accountService.saveUser(user);

        return user;
    }

    @PutMapping("/update")
    public UserDTO update(@PathVariable Long id, @RequestBody UserDTO user){
        user.setId(id);
        return accountService.saveUser(user);
    }

}