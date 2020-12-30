package experis.humansvszombies.hvz.security.services;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import experis.humansvszombies.hvz.models.enums.UserType;
import experis.humansvszombies.hvz.models.tables.UserAccount;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;
    private Integer id;
    private String username;
	private String email;
	private Collection<? extends GrantedAuthority> authorities;

    @JsonIgnore
    private String password;


    public UserDetailsImpl(Integer id, String username, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.email = email;
		this.password = password;
		this.authorities = authorities;
    }

    public static UserDetailsImpl build(UserAccount user) {
		Set<UserType> role = new HashSet<>();
		role.add(user.getUserType());

		List<GrantedAuthority> authorities = role.stream()
			.map(r -> new SimpleGrantedAuthority(r.name()))
			.collect(Collectors.toList());

		return new UserDetailsImpl(
				user.getUserAccountId(), 
				user.getUsername(), 
				user.getEmail(),
				user.getPassword(),
				authorities);
    }
    
    @Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public Integer getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}
}
