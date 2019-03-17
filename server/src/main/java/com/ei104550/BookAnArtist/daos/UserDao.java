package com.ei104550.BookAnArtist.daos;

import com.ei104550.BookAnArtist.Exceptions.UserDoesntExistException;
import com.ei104550.BookAnArtist.model.QUser;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.UserRepository;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Component
public class UserDao {

    @Autowired
    private UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;
    private QUser qUser = QUser.user;

    public void addNewUser(User user) {
        userRepository.save(user);
    }

    public User getuserByUserName(String userName) throws UserDoesntExistException {
        JPAQuery<User> jpaQuery = new JPAQuery<User>(entityManager);
        User user = jpaQuery.select(qUser)
                .from(qUser)
                .where(QUser.user.username.eq(userName)).fetchOne();
        if(user == null){
            throw new UserDoesntExistException();
        }
        return user;
    }
}
