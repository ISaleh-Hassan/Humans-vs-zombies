package experis.humansvszombies.hvz.models.tables;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "userAccountId"
)
public class UserAccount {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="user_account_id")
    private Integer userAccountId;

    @OneToMany(mappedBy="userAccount", cascade=CascadeType.ALL)
    private Collection<Player> players = new ArrayList<Player>();


    public UserAccount() {
        
    }

    public UserAccount(Integer userAccountId) {
        this.userAccountId = userAccountId;
    }

    public Integer getUserAccountId() {
        return userAccountId;
    }

    public void setUserAccountId(Integer userAccountId) {
        this.userAccountId = userAccountId;
    }

}
