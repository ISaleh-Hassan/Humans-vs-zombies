import { TextField } from "@material-ui/core";
import { Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import Header from '../StylingComponents/Header';
import NavBar from "../StylingComponents/NavBar";
import { makeStyles } from '@material-ui/core/styles';
import { DeleteMission, UpdateMission, FetchMission, FetchAllMissions } from '../../utils/missionStorage'
import MainMap from "../MapComponents/MainMap";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const EditMissionMarker = (props) => {

    const [validMissionName, setValidMissionName] = useState(false);
    const [validDescription, setValidDescription] = useState(true);
    const [deleteMission, setDeleteMission] = useState(false);
    const [allMissions, setAllMissions] = useState([])
    const [selectedMissionId, setSelectedMissionId] = useState(null);
    const [missionObject, setMissionObject] = useState({})

    useEffect(() => {
        fetchAllMissions();
    }, []);

    useEffect(() => {
        if (selectedMissionId !== null) {
            fetchMission()
        }
        else {
            setMissionObject({})
        }
    }, [selectedMissionId]);

    useEffect(() => {

    }, [missionObject]);

    async function fetchAllMissions() {
        let allMissions = await FetchAllMissions();
        if (allMissions !== null) {
            setAllMissions(allMissions);
        } else {
            alert('Failed to fetch missions');
            setAllMissions([]);
        }
    }

    async function fetchMission() {
        let mission = await FetchMission(selectedMissionId);
        if (mission !== null) {
            setMissionObject(
                {
                    missionId: mission.missionId,
                    name: mission.name,
                    missionDescription: mission.missionDescription,
                    factionVisibility: mission.factionVisibility,
                    missionPoint: {
                        x: mission.missionPoint.x,
                        y: mission.missionPoint.y
                    },
                    missionState: mission.missionState,
                    startTime: mission.startTime,
                    endTime: mission.endTime
                }
            );
        } else {
            alert('Failed to fetch missions');
            setMissionObject({});
        }
    }

    async function editMission() {
        let editMissionResponse = await UpdateMission(missionObject);
        if (editMissionResponse.status === 200) {
            props.history.push("/admin");
        } else if (editMissionResponse.status === 400) {
            alert("Mission name must be unique!");
        } else {
            alert("Something went wrong while updating the mission.");
        }
    }

    const onMissionNameChange = ev => {
        let currentMissionName = ev.target.value;
        if (currentMissionName.length < 4) {
            setValidMissionName(false);
        }
        else {
            setMissionObject((prevState) => ({
                ...prevState,
                name: currentMissionName
            }));
            setValidMissionName(true);
        }
        localStorage.setItem("Mission Name: ", ev.target.value)
    }

    const onDescriptionChange = ev => {
        let currentDescription = ev.target.value;
        if (currentDescription.length < 4) {
            setValidDescription(false);
        }
        else {
            setMissionObject((prevState) => ({
                ...prevState,
                missionDescription: currentDescription
            }));
            setValidDescription(true);
        }
    }

    const onFactionChange = ev => {
        let currentFaction = ev.target.value;
        setMissionObject((prevState) => ({
            ...prevState,
            factionVisibility: currentFaction
        }));
    }


    const onStartTimeChange = ev => {
        let time = ev.target.value;
        setMissionObject((prevState) => ({
            ...prevState,
            startTime: time
        }));
    }

    const onEndTimeChange = ev => {
        let time = ev.target.value;
        setMissionObject((prevState) => ({
            ...prevState,
            endTime: time
        }));
    }

    const onLngChange = ev => {
        let lng = ev.target.value;
        setMissionObject((prevState) => ({
            ...prevState,
            missionPoint: {
                x: lng,
                y: missionObject.missionPoint.y
            }
        }));
    }

    const onLatChange = ev => {
        let lat = ev.target.value;
        setMissionObject((prevState) => ({
            ...prevState,
            missionPoint: {
                x: missionObject.missionPoint.x,
                y: lat
            }
        }));
    }

    function getCoordinates() {
        let lngValue = localStorage.getItem("Lng: ")
        let latValue = localStorage.getItem("Lat: ")

        let lng = document.getElementById('p-lng');
        lng.value = lngValue;

        let lat = document.getElementById('p-lat');
        lat.value = latValue;
    }

    function getLng() {
        let copyText = document.getElementById("p-lng");

        copyText.select();
        copyText.setSelectionRange(0, 99999);

        document.execCommand("copy");

        alert("Copied the text: " + copyText.value);
    }

    function getLat() {
        let copyText = document.getElementById("p-lat");

        copyText.select();
        copyText.setSelectionRange(0, 99999);

        document.execCommand("copy");

        alert("Copied the text: " + copyText.value);
    }
    async function onDeleteClicked() {
        let missionResponse = await DeleteMission(missionObject.missionId);
        if (missionResponse === 200) {
            props.history.push("/missions");
        } else {
            console.log("Something went wrong when trying to delete the mission.");
        }
    }

    const onCheckBoxChanged = ev => {
        setDeleteMission(!deleteMission);
    }

    function handleChangeMissionToUpdate(ev) {
        let selectedMission = ev.target.value;
        localStorage.setItem("Mission ID", selectedMission)
        if (selectedMission !== "0") {
            setSelectedMissionId(selectedMission)
            setMissionObject({})
        }
        else {
            setSelectedMissionId(null);
        }
    }

    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    }

    return (
        <>
            <Header />
            <section className="home">
                <div className="container">
                    <h1>Edit Mission Marker</h1>
                    <Form.Group>

                        <Form.Control
                            onChange={handleChangeMissionToUpdate}
                            className="mb-4"
                            as="select">
                            <option value="0">Select mission...</option>
                            {allMissions.filter(mission => mission.factionVisibility !== 'ALL').map(filteredMission => (
                                <option key={filteredMission.missionId} value={filteredMission.missionId}>
                                    {filteredMission.name}
                                </option>
                            ))}
                        </Form.Control>


                        {selectedMissionId !== null && !isEmpty(missionObject) ?
                            <div>
                                <Form.Control type="text" placeholder="Enter mission name" defaultValue={missionObject.name} onChange={onMissionNameChange} />
                                <br />
                                <Form.Control type="text" placeholder="Mission description..." defaultValue={missionObject.missionDescription} onChange={onDescriptionChange} />
                                <br />
                                <label>Faction: </label>
                                <Form.Control as="select" placeholder="Faction" defaultValue={missionObject.factionVisibility} onChange={onFactionChange}>
                                    <option>HUMAN</option>
                                    <option>ZOMBIE</option>
                                    <option>ALL</option>
                                </Form.Control>
                                <br />
                                <Form.Control type="text" placeholder="Longitude" defaultValue={missionObject.missionPoint.x} onChange={onLngChange} />
                                <Form.Control type="text" placeholder="Latitude" defaultValue={missionObject.missionPoint.y} onChange={onLatChange} />
                                <br />
                                <MainMap />
                                <input id="p-lng" />
                                <button onClick={getLng}>Copy Lng</button>
                                <input id="p-lat" />
                                <button onClick={getLat}>Copy Lat</button>
                                <br></br>
                                <button onClick={getCoordinates}>Get Coords</button>
                                <br />
                                <br />
                                <TextField
                                    id="datetime-local"
                                    label="Start time"
                                    type="datetime-local"
                                    defaultValue={missionObject.startTime.substring(0, 16)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={onStartTimeChange}
                                />
                                <br />  <br />
                                <TextField
                                    id="datetime-local"
                                    label="End time"
                                    type="datetime-local"
                                    defaultValue={missionObject.endTime.substring(0, 16)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={onEndTimeChange}
                                />
                                <br /><br />
                                <Button disabled={!validMissionName || !validDescription} onClick={editMission}>Update Mission</Button>
                                <Button disabled={!deleteMission} onClick={onDeleteClicked}>Delete Mission</Button>
                                <Form.Group controlId="deleteMissionCheckbox">
                                    <Form.Check type="checkbox" label="Delete Mission?" onChange={onCheckBoxChanged} />
                                </Form.Group>

                            </div>
                            : null}
                    </Form.Group>
                </div>
            </section>
        </>
    );
};

export default EditMissionMarker;