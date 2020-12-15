package experis.humansvszombies.hvz.repositories;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.Squad;
import experis.humansvszombies.hvz.models.tables.SquadMember;

public interface SquadMemberRepository extends JpaRepository<SquadMember, Integer> {
    ArrayList<SquadMember> findByGameAndSquad(Game game, Squad squad);
    SquadMember findDistinctByGameAndPlayer(Game game, Player player);
}
