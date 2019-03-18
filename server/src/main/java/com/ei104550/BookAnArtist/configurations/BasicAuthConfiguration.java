package com.ei104550.BookAnArtist.configurations;
import com.ei104550.BookAnArtist.Services.UserService;
import com.ei104550.BookAnArtist.daos.UserDao;
import com.ei104550.BookAnArtist.model.User;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class BasicAuthConfiguration extends WebSecurityConfigurerAdapter  {
    @Autowired
    private CustomAuthenticationProvider authProvider;

    @Autowired
    private UserDao userDao;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        //todo check why appears warning WARN  o.s.s.c.bcrypt.BCryptPasswordEncoder - Encoded password does not look like BCrypt
//        auth
//                .inMemoryAuthentication().passwordEncoder(passwordEncoder())
//                .withUser("user")
//                .password("password")
//                .roles("USER");
        auth.jdbcAuthentication().passwordEncoder(passwordEncoder()).authoritiesByUsernameQuery("SELECT * from USER WHERE ");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers().frameOptions().disable();
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers(HttpMethod.GET, "/artistas").permitAll()
                .antMatchers(HttpMethod.GET, "/user-image").permitAll()
                .antMatchers(HttpMethod.GET, "/**").permitAll()
                .antMatchers(HttpMethod.POST, "/register").permitAll()
                .antMatchers(HttpMethod.POST,"/login").permitAll()
                .antMatchers(HttpMethod.POST,"/**" ).permitAll()
                .antMatchers(HttpMethod.POST, "/user").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
