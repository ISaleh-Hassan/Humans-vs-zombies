package experis.humansvszombies.hvz.repositories;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.enums.Faction;
import experis.humansvszombies.hvz.models.tables.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {
    ArrayList<ChatMessage> findByGameAndFaction(Integer gameId, Faction faction);
    ArrayList<ChatMessage> findByGameAndSquad(Integer gameId, Integer squadId);
}
