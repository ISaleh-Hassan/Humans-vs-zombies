import React from 'react';

function SquadDetail () {
  return (
    <div>
        <h2>SQUAD NAME</h2>
        <ul id="squadMembers">
            <li>Toatsmcgoats(ALIVE) - Leader</li>
            <li>Desklamp(DEAD) - Member</li>
        </ul>
        <button>Mark Location</button>
        <button>Leave Squad</button>
        <button>Disband Squad (only available to the leader)</button>
    </div>
  );
}

export default SquadDetail;