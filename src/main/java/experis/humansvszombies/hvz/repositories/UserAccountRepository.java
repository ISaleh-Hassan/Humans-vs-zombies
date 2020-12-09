package experis.humansvszombies.hvz.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.tables.UserAccount;

public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {
    UserAccount findDistinctByEmail(String email);
}
