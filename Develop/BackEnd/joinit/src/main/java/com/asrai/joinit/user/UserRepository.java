package com.asrai.joinit.user;

import com.asrai.joinit.domain.User;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@Repository
//@Slf4j
//@RequiredArgsConstructor
public interface UserRepository extends JpaRepository<User, Long> {

}
