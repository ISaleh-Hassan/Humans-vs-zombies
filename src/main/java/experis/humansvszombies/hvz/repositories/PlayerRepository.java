package experis.humansvszombies.hvz.repositories;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.UserAccount;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    Player findDistinctByGameAndUserAccount(Game game, UserAccount userAccount);
    ArrayList<Player> findByGame(Game game);
}
