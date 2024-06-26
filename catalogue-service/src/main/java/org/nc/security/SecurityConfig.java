package org.nc.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        //http.formLogin();
        http.authorizeRequests().antMatchers(HttpMethod.GET, "/categories/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET, "/actuator/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET, "/products/**").permitAll();
        http.authorizeRequests().antMatchers("/categories/save").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/categories/delete").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/products/save").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/products/delete").hasAuthority("ADMIN");
        http.authorizeRequests().antMatchers("/cartItems/**").hasAuthority("USER");
        http.authorizeRequests().antMatchers("/shoppingCarts/**").hasAuthority("USER");
        http.authorizeRequests().antMatchers("/payments/**").hasAuthority("USER");
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilterBefore(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

}
