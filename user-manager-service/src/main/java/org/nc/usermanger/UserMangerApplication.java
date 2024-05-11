package org.nc.usermanger;

import org.nc.usermanger.dao.UserRepository;
import org.nc.usermanger.dto.RoleDTO;
import org.nc.usermanger.dto.UserDTO;
import org.nc.usermanger.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class UserMangerApplication{


    public static void main(String[] args) {
        SpringApplication.run(UserMangerApplication.class, args);
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner start(AccountService accountService, UserRepository userRepository){
        return args -> {
            accountService.saveRole(new RoleDTO(null,"USER"));
            accountService.saveRole(new RoleDTO(null,"ADMIN"));
            accountService.saveUser(new UserDTO(null,"nouhaila","nouha1234","NOUHAILA CHKHONTY","nohaila.chkhonty@gmail.com","ksar el kebir","0625614992", null));
            accountService.saveUser(new UserDTO(null,"admin","12345678","ADMIN","admin@gmail.com","Larache","0625614992", null));
            accountService.addRoleToUser("admin", "ADMIN");
            //System.out.println(userRepository.findAll());
        };
    }

}
