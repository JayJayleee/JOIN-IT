package com.asrai.joinit.util.jwt;

import com.asrai.joinit.domain.User;
import com.asrai.joinit.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
        User user = userRepository.findByLoginId(loginId)
            .orElseThrow(() -> new UsernameNotFoundException("Can't find " + loginId));

        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getLoginId())
            .password(user.getPassword())
            .roles(user.getRole().toString())
            .build();
    }
}
