package org.nc.usermanger.dao;

import org.nc.usermanger.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UserRepository extends JpaRepository<AppUser, Long> {
    public AppUser findByUsername(String username);
    public List<AppUser> findByNameContainingIgnoreCase(String name);
}
