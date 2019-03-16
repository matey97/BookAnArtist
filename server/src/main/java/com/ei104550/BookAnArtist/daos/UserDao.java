package com.ei104550.BookAnArtist.daos;

import com.ei104550.BookAnArtist.model.QUser;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.UserRepository;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;

@Component
public class UserDao {

    @Autowired
    private UserRepository userRepository;

    private EntityManager entityManager;
    private QUser qUser;

    public void addNewUser(User user) {
        userRepository.save(user);
    }

    public User getuserByUserName(String userName) {
        JPAQuery<User> jpaQuery = new JPAQuery<User>(entityManager);
        User user = jpaQuery.select(qUser)
                .from(qUser)
                .where(QUser.user.username.eq(userName)).fetchOne();
        return user;
    }
}
