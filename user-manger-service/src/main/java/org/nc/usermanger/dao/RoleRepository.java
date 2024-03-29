package org.nc.usermanger.dao;

import org.nc.usermanger.entity.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<AppRole, Long> {
    public AppRole findByRole(String role);
}
