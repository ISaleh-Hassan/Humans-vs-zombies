import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { getPlayerInfo } from "../../utils/gamedbstorage";
import { FetchAllMissions } from '../../utils/missionStorage';

const Missions = (props) => {

    const [missions, setMissions] = useState([]);
    const [missionFilter, setmissionFilter] = useState('ALL');
    let faction = localStorage.getItem("Faction")

    useEffect(() => {
        fetchMissions();
        getPlayerInfo();
    }, []);

    useEffect(() => {

    }, [missionFilter])

    async function fetchMissions() {
        const missions = await FetchAllMissions();
        if (missions != null) {
            setMissions(missions);
        } else {
            setMissions([]);
        }
    }

    function handlePreview(id) {
        localStorage.setItem("Mission ID", id);
        props.history.push("/mission");
    }

    const onFilterButtonClicked = ev => {
        let filter = ev.target.value;
        setmissionFilter(filter);
    }

    return (
        <>
            <section className="home">
                <div>
                    <h2>Current Missions</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Mission</th>
                                <th>Description</th>
                                <th>Faction</th>
                                <th>Start</th>
                                <th>End</th>
                            </tr>
                        </thead>
                        <tbody>
                            {missions.map((m) =>
                                <tr key={m.missionId}>
                                    {m.name && m.factionVisibility === faction ? <td>{m.name}</td> : null}
                                    {m.missionDescription && m.factionVisibility === faction ? <td>{m.missionDescription}</td> : null}
                                    {m.factionVisibility  && m.factionVisibility === faction ? <td>{m.factionVisibility}</td> : null}
                                    {m.startTime && m.factionVisibility === faction ? <td>{m.startTime}</td> : null}
                                    {m.endTime && m.factionVisibility === faction ? <td>{m.endTime}</td> : null}
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <br></br>
                </div>
            </section>
        </>
    );
};

export default Missions;