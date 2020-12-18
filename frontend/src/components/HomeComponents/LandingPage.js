import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../StylingComponents/Header';

class LandingPage extends Component {

    state = {
        details: []
    };

    componentDidMount() {
        let gameId = localStorage.getItem('gameId');
        fetch('http://localhost:8080/api/fetch/game/' + gameId)
            .then(res => res.json())
            .then((data) => {
                this.setState({details: data})
          })
            .catch(console.log);
    };

    // Need to remove the game id from the current player in the database as well
    handleLeaveGame() {
        localStorage.removeItem('gameId');
    };

    render() {
        return (
            <div>
                <Header />
                <div id="landing">
                    <h2> {this.state.details.name}
                        {console.log(this.state.details)} </h2>
                    <div id="description">
                        <br/>
                        <h3>Description: </h3>
                        <p> {this.state.details.description} </p>
                        <br/>
                        <h4>Start Time: {this.state.details.startTime}
                            <br/>
                            End Time: {this.state.details.endTime}
                        </h4>
                        <br/>
                    </div>
                </div>

                <div>
                    <Link to="/currentgames">
                        <button onClick={this.handleLeaveGame}>Leave Game</button>
                    </Link>
                </div>

                <div id="rules">
                    <br/>
                    <h3>Rules: </h3>
                    <div>
                        <h4>Overview</h4>
                        <ul>
                            <li>Humans vs. Zombies is a game of tag.</li>
                            <li>All players begin as humans, and one is randomly chosen to be the “Original Zombie”.</li>
                            <li>The Original Zombie tags human players and turns them into zombies.</li>
                            <li>Zombies must tag and eat a human every 24 hours or they starve to death and are out of the game.</li>
                        </ul>
                        <br/>

                        <h4>Objective</h4>
                        <ul>
                            <li>The Zombies win when all human players have been tagged and turned into zombies.</li>
                            <li>The Humans win by surviving long enough for all of the zombies to starve.</li>
                        </ul>
                        <br/>

                        <h4>Equipment</h4>
                        <ul>
                            <li>Bandana</li>
                            <li>Foam Dart Blaster (aka Nerf Gun)</li>
                            <li>Marshmallow Launcher</li>
                            <li>Rolled up (CLEAN) socks</li>
                        </ul>
                        <br/>

                        <h4>Safe Zones</h4>
                        <p>Some areas on campus are “no play zones,” where the game is permanently suspended. Blasters must be concealed and no players may be stunned or tagged. </p>
                        <br/> 
                        <p>These areas include:</p>
                        <ul>
                            <li>Bathrooms</li>
                            <li>Health Centers</li>
                            <li>Libraries</li>
                            <li>Indoor Athletic Facilities</li>
                            <li>Academic Buildings</li>
                        </ul>
                        <br/>
                        <p>Other areas on campus are merely "safe zones", where gameplay continues but humans can't be tagged (unless a zombie has both of their feet outside the safe zone). These areas include: Dorm rooms and Dining Halls</p>
                        <br/>

                        <h4>Safety Rules</h4>
                        <p>Rules created for the safety of all players are strictly enforced. Violation of safety rules will result in a ban from the game.</p>
                        <br/>
                        <ul>
                            <li>No realistic looking weaponry. Blasters must be brightly colored and have blaze-orange tips.</li>
                            <li>Blasters may not be visible inside of academic buildings or jobs on campus.</li>
                            <li>Players may not use cars or play where there is traffic.</li>
                            <li>Socks, Darts or Marshmallows must not hurt on impact.</li>
                        </ul>
                        <br/>

                        <h4>Human Rules</h4>
                        <ul>
                            <li>Wearing a Bandanna: Humans must wear a headband around an arm or leg to identify them as players of the game. (This headband will come in handy when you become a zombie!)</li>
                            <li>Stunning a Zombie: Humans may stun a Zombie for 15 minutes by blasting them with a blaster or throwing a sock at them.</li>
                            <li>When Tagged By a Zombie: When tagged by a Zombie, a Human is required to distribute their ID card. One hour after being tagged, tie your bandanna around your head – you are now a member of the Zombie team! Go tag some Humans.</li>
                            <li>Staying On Campus: Humans must sleep on campus. If you need to leave campus for longer than 24 hours, contact the game moderators and remove yourself from the game.</li>
                        </ul>
                        <br/>

                        <h4>Zombie Rules</h4>
                        <ul>
                            <li>Feeding: Zombies must feed every 24 hours. A zombie feeds by reporting their tag on the app.</li>
                            <li>Tagging: A tag is a firm touch to any part of a Human. After tagging a Human the Zombie must collect their Bite Code and report it in the app.</li>
                            <li>Getting Shot: When hit with a dart, a marshmallow, or a sock, a Zombie is stunned for 15 minutes. A stunned zombie may not interact with the game in any way. This includes shielding other zombies from bullets or continuing to run toward a human. If shot while stunned, the zombie’s stun timer is reset back to 15 minutes.</li>
                            <li>Wearing A Headband: Zombies must wear a bandanna around their heads at all times. The Original Zombie does not need to wear a headband.</li>
                        </ul>
                        <br/>

                        <h4>Other Rules</h4>
                        <ul>
                            <li>Blasting Non-Players: Blasting non-players is a bannable offense.</li>
                            <li>Non-Player Interference: People who are not registered participants may not directly interact with the game. This includes bringing food to humans or spying for either team.</li>
                            <li>Safe Zones: A zombie must have both feet outside of a safe zone to tag a human. Humans can stun zombies from inside of a safe-zone.</li>
                            <li>No Shields: Zombies may not use shields to deflect foam darts, marshmallows or socks.</li>
                            <li>Athletes: Athletes are safe during official practices, but not on the way to or from practice.</li>
                            <li>Required Academic Events: Similarly, students at required academic events are safe for the duration of the event (even if this event is in a free-play zone), but they are not safe on the way to or from the event.</li>
                        </ul>
                        <br/>

                        <h4>DBag Clause</h4>    
                        <p>Don’t be a douchebag. Everyone plays Humans vs. Zombies to have fun, and the rules of HvZ only exist because we agree they do. That’s why the most important rule of Humans vs. Zombies is to treat your fellow players with respect, and gracefully accept when you have been tagged or stunned.</p>                
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;