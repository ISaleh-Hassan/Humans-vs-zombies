import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { getPlayerInfo } from "../../utils/gamedbstorage";
import { FetchAllMissions } from '../../utils/missionStorage';

const Missions = (props) => {

    const [missions, setMissions] = useState([]);
    const [missionFilter, setmissionFilter] = useState('ALL');

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
                    <h1>Game Name- Map</h1>
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
                                    {m.missionState === missionFilter || missionFilter === 'ALL' ? <td>{m.name}</td> : null}
                                    {m.missionState === missionFilter || missionFilter === 'ALL' ? <td>{m.missionDescription}</td> : null}
                                    {m.missionState === missionFilter || missionFilter === 'ALL' ? <td>{m.factionVisibility}</td> : null}
                                    {m.missionState === missionFilter || missionFilter === 'ALL' ? <td>{m.startTime}</td> : null}
                                    {m.missionState === missionFilter || missionFilter === 'ALL' ? <td>{m.endTime}</td> : null}
                                    {m.missionState === missionFilter || missionFilter === 'ALL' ? <td>
                                        {m.missionState === 'PREPARATION' ? <Button type="button" variant="warning" disabled={m.missionState === 'COMPLETED'} onClick={() => handlePreview(m.missionId)}>Preview</Button> : null}
                                        {m.missionState === 'IN_PROGRESS' ? <Button type="button" variant="success" disabled={m.missionState === 'COMPLETED'} onClick={() => handlePreview(m.missionId)}>Preview</Button> : null}
                                        {m.missionState === 'COMPLETED' ? <Button type="button" variant="dark" disabled={m.missionState === 'COMPLETED'} onClick={() => handlePreview(m.missionId)}>Preview</Button> : null}
                                    </td> : null}
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