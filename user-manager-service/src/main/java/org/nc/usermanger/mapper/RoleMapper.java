package org.nc.usermanger.mapper;

import lombok.AllArgsConstructor;
import org.nc.usermanger.dto.RoleDTO;
import org.nc.usermanger.entity.AppRole;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RoleMapper {
    public RoleDTO fromRole(AppRole role){
        RoleDTO roleDTO = new RoleDTO();
        BeanUtils.copyProperties(role, roleDTO);
        return roleDTO;
    }

    public AppRole fromRoleDTO(RoleDTO roleDTO){
        AppRole role = new AppRole();
        BeanUtils.copyProperties(roleDTO,role);
        return role;
    }
}
