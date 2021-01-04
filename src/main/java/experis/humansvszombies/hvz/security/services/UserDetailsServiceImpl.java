package experis.humansvszombies.hvz.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import experis.humansvszombies.hvz.models.tables.UserAccount;
import experis.humansvszombies.hvz.repositories.UserAccountRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserAccountRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAccount user = userRepository.findDistinctByUsername(username);
        if (user != null) {
            return UserDetailsImpl.build(user);
        } else {
            throw new UsernameNotFoundException("Could not find user with Username: " + username);
        }
    }
}
