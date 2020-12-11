package experis.humansvszombies.hvz.repositories;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.enums.Faction;
import experis.humansvszombies.hvz.models.tables.ChatMessage;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Squad;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {
    ArrayList<ChatMessage> findByGameAndFactionAndSquad(Game game, Faction faction, Squad squad);
    ArrayList<ChatMessage> findByGameAndSquad(Game game, Squad squad);
}
