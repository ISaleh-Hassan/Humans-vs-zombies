import { TextField } from "@material-ui/core";
import { Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import Header from '../StylingComponents/Header';
import NavBar from "../StylingComponents/NavBar";
import { makeStyles } from '@material-ui/core/styles';
import { DeleteMission, UpdateMission, FetchMission } from '../../utils/missionStorage'
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
    const [deleteMission, setDeleteMission] = useState(false);
    const [missionObject, setMissionObject] = useState(
        {
            missionId: null,
            name: null,
            faction: null,
            missionState: null,
            startTime: null,
            endTime: null,
            gameId: null
        })
    let markerLng = localStorage.getItem('Marker Lng: ')
    let markerLat = localStorage.getItem('Marker Lat: ')

    useEffect(() => {
        loadMissionDetails();
    }, []);

    async function loadMissionDetails() {
        const missionId = localStorage.getItem("Mission ID");
        if (missionId != null) {
            const mission = await FetchMission(missionId);
            setMissionObject({
                missionId: mission.missionId,
                name: mission.name,
                faction: mission.faction,
                missionState: mission.missionState,
                startTime: mission.startTime,
                endTime: mission.endTime,
                gameId: mission.gameId
            })
        } else {
            alert("Mission ID is null.");
        }
    }

    async function editMission() {
        if (validMissionName === true) {
            let updateMissionResponse = await UpdateMission(missionObject);
            if (updateMissionResponse.status === 200) {
                props.history.push("/missions");
            } else if (updateMissionResponse.status === 400) {
                alert("Mission name must be unique!");
            } else {
                alert("Something went wrong while creating the mission.");
            }
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

    async function onDeteleClicked() {
        let missionResponse = await DeleteMission(missionObject.missionId);
        if (missionResponse === 200) {
            props.history.push("/mission");
        } else {
            console.log("Something went wrong when trying to delete the mission.");
        }
    }

    const onMissionStateChange = ev => {
        let currentState = ev.target.value;
        setMissionObject((prevState) => ({
            ...prevState,
            missionState: currentState
        }));
    }

    const onCheckBoxChanged = ev => {
        setDeleteMission(!deleteMission);
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

    return (
        <>
            <Header />
            <NavBar />
            <section className="home">
                <div className="container">
                    <h1>Edit Mission Marker</h1>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter mission name" onChange={onMissionNameChange} />
                        <br />
                        <Form.Control type="text" placeholder="Coordinates" />
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
                        <Form.Control as="select" placeholder="MissionState" onChange={onMissionStateChange}>
                            <option>PREPARATION</option>
                            <option>IN_PROGRESS</option>
                            <option>COMPLETED</option>
                        </Form.Control>
                        <br />
                        <TextField
                            id="datetime-local"
                            label="Start time"
                            type="datetime-local"
                            defaultValue="2021-01-01T08:00"
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
                            defaultValue="2021-01-02T08:00"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={onEndTimeChange}
                        />
                        <br />
                        <br /><br />
                        <Button disabled={!validMissionName} onClick={editMission}>Update Mission</Button>
                        <Button disabled={!deleteMission} onClick={onDeteleClicked}>Delete Mission</Button>
                        <Form.Group controlId="deleteMissionCheckbox">
                            <Form.Check type="checkbox" label="Delete Mission?" onChange={onCheckBoxChanged} />
                        </Form.Group>
                    </Form.Group>
                </div>
            </section>
        </>
    );
};

export default EditMissionMarker;