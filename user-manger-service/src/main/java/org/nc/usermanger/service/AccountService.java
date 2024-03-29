package org.nc.usermanger.service;

import org.nc.usermanger.dto.RoleDTO;
import org.nc.usermanger.dto.UserDTO;

import java.util.List;

public interface AccountService {

    public UserDTO saveUser(UserDTO userDTO);
    public RoleDTO saveRole(RoleDTO roleDTO);
    public UserDTO findByUserName(String username);
    public void addRoleToUser(String username, String roleName);
    public List<UserDTO> users();
    public List<RoleDTO> roles();
    public void deleteUser(UserDTO user);
    public void deleteRole(RoleDTO role);
    public UserDTO getUser(Long id);
    public RoleDTO getRole(Long id);
}
