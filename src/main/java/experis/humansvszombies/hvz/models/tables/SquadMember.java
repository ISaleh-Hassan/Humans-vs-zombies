package experis.humansvszombies.hvz.models.tables;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import experis.humansvszombies.hvz.models.enums.SquadRank;

@Entity(name="squad_member")
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "squadMemberId"
)
public class SquadMember {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="squad_member_id")
    private Integer squadMemberId;   

    @Column(name="squad_rank")
    private SquadRank squadRank;    

    @ManyToOne
    private Game game;

    @ManyToOne
    private Squad squad;

    @OneToOne
    private Player player;

    @OneToMany(mappedBy="squadMember", cascade=CascadeType.REMOVE)
    private Collection<SquadCheckin> squadCheckins = new ArrayList<SquadCheckin>();

    public SquadMember() {

    }

    public SquadMember(Integer squadMemberId) {
        this.squadMemberId = squadMemberId;
    }

    public SquadMember(SquadRank rank) {
        this.squadRank = rank;        
    }

    public Integer getSquadMemberId() {
        return squadMemberId;
    }

    public void setSquadMemberId(Integer squadMemberId) {
        this.squadMemberId = squadMemberId;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Squad getSquad() {
        return squad;
    }

    public void setSquad(Squad squad) {
        this.squad = squad;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public SquadRank getSquadRank() {
        return squadRank;
    }

    public void setSquadRank(SquadRank squadRank) {
        this.squadRank = squadRank;
    }
}
