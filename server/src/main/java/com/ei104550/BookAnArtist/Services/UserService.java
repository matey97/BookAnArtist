package com.ei104550.BookAnArtist.Services;

import com.ei104550.BookAnArtist.Exceptions.RegistrationForbiddenException;
import com.ei104550.BookAnArtist.daos.UserDao;
import com.ei104550.BookAnArtist.enums.UserType;
import com.ei104550.BookAnArtist.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component("userService")
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserDao userDao;

    public String EncodeUserPassword(String password) {
       return passwordEncoder.encode(password);
    }

    public void checkUserType(UserType userType) throws RegistrationForbiddenException {
        if (userType.equals(UserType.ADMIN)){
            throw new RegistrationForbiddenException();
        }
    }

    public void addNewUser(User user) {
        userDao.addNewUser(user);
    }

    public boolean checkCredentials(String userName, String password) {
        User user = userDao.getuserByUserName(userName);
        return isUser(userName, user) && isPasswordCorrect(password, user);
    }

    private boolean isPasswordCorrect(String password, User user) {
        return user.getPassword().equals(passwordEncoder.encode(password));
    }

    private boolean isUser(String userName, User user) {
        return user!= null && userName.equals(user.getUsername().trim().toLowerCase());
    }

    public void logInRegisteredUser(User user) {

    }
}
