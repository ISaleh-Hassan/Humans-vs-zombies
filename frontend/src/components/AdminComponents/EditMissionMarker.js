import { TextField } from "@material-ui/core";
import { Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import Header from '../StylingComponents/Header';
import NavBar from "../StylingComponents/NavBar";
import { Link } from "react-router-dom";
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
            endTime: null
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
                endTime: mission.endTime
            })
        } else {
            alert("Mission ID is null.");
        }
    }

    async function editMission() {
        if (validMissionName === true) {
            let updateMissionResponse = await UpdateMission(missionObject);
            if (updateMissionResponse.status === 201) {
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

    const onCheckBoxChanged = ev => {
        setDeleteMission(!deleteMission);
    }

    function clicked() {
        console.log("Hello")
        let lng = document.getElementById("markerLng");

        lng.select();
        lng.setSelectionRange(0, 99999); /* For mobile devices */

        document.execCommand('copy');

        alert("Copied the text: " + lng.value);
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
                        <input id="markerLng" type="text" value={markerLng} hidden />
                        <input id="markerLat" type="text" value={markerLat} hidden />
                        <button onClick={clicked}>Click</button>
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