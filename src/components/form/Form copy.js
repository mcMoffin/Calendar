import React, { useState, useContext } from 'react';
import './form.css'
import { RootContext } from '../utils/context';

import { Formik} from "formik";
import { Form, InputGroup, Row, Col, Button } from 'react-bootstrap';

import { DatePicker  } from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const CalForm = () => {
    const { dispatch } = useContext(RootContext);
    const { rootState } = useContext(RootContext);

    const date = new Date();

    const [calStartDate, setCalStartDate] = useState(date);
    const [calEndDate, setCalEndDate] = useState(date);
    const [show, setShow] = useState(false);
    // const arrTimeZones = Intl.supportedValuesOf('timeZone');

    // makes list of timezones for dropdown
    /* arrTimeZones.forEach((timeZone) =>{
        let strTime = date.toLocaleString("en-US",{timeZone: `${timeZone}`});
        console.log(timeZone, strTime);
    }); */

    function pad(value) {
        return value < 10 ? '0' + value : value;
    } 

    // returns time offset and UTC offset
    function createOffset(date) {
        const sign = (date.getTimezoneOffset() > 0) ? "+" : "-";
        const offset = Math.abs(date.getTimezoneOffset());
        const hours = pad(Math.floor(offset / 60));
        const minutes = pad(offset % 60);
        const utcValues = {
            utcSign: sign,
            utcTime: `${sign}${hours}:${minutes}}`,
            offsetVal: offset,
        }

        return utcValues;
    }

    const toUtcTime = () => {
        
    }

    async function onSubmit({ title, location, description, allDay, calStartHours, calStartMin, calEndHours, calEndMin }) {
        const tempStart = new Date(`${calStartDate.getMonth() + 1} ${calStartDate.getDate()} ${calStartDate.getFullYear()} ${calStartHours}:${calStartMin}`);
        const tempEnd = new Date(`${calEndDate.getMonth() + 1} ${calEndDate.getDate()} ${calEndDate.getFullYear()} ${calEndHours}:${calEndMin}`);
        // console.log(createOffset(tempStart).utcSign == "+"? calStartHours + createOffset(tempStart).offsetVal );
        dispatch({ type: 'title', payload: title });
        dispatch({ type: 'location', payload: location });
        dispatch({ type: 'description', payload: description });
        dispatch({ type: 'allDay', payload: allDay });
        dispatch({ type: 'start', payload: tempStart });
        dispatch({ type: 'end', payload: tempEnd });
    }

    return (
        <Formik
            initialValues={{
                title: rootState.title,
                location: rootState.location,
                description: rootState.description,
                start: date,
                end: date,
                calStartHours: date.getHours(),
                calStartMin: date.getMinutes(),
                calEndHours: date.getHours(),
                calEndMin: date.getMinutes(),
                allDay: rootState.allDay
            }}
            onSubmit={onSubmit}
        >
            {({ handleSubmit, handleChange, values }) => (
                <form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        {/* descriptin, name, and location */}
                        <Col xs="auto" className='mb-2'>
                            <Form.Group>
                                <Form.Label  htmlFor="title"> Event Title </Form.Label>
                                <Form.Control
                                    placeholder="Enter the event title"
                                    aria-label="event title"
                                    aria-describedby="basic-addon1"
                                    id="title"
                                    name="title"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.title}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs="auto">
                            <Form.Group>
                                <Form.Label>Location</Form.Label>                       
                                <Form.Control
                                    placeholder="Location"
                                    aria-label="Event Location"
                                    aria-describedby="basic-addon1"
                                    id="location"
                                    name="location"
                                    type="address"
                                    onChange={handleChange}
                                    value={values.location}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                
                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                {/* Description filed */}
                                <Form.Label >Details</Form.Label>
                                <Form.Control
                                    placeholder="Details of the event"
                                    as="textarea"
                                    aria-label="description"
                                    aria-describedby="basic-addon1"
                                    id="description"
                                    name="description"
                                    type="textarea"
                                    onChange={handleChange}
                                    value={values.description}
                                />
                            </Form.Group>
                        </Col>                        
                    </Row>
                
                    {/* Time zone dropdown */}
                {/* <Row>
                        <Col>
                            <InputGroup>
                                <Form.Select
                                    aria-label="Floating label select example"
                                    id="timeZone"
                                    name="timeZone"
                                    onChange={handleChange}
                                    value={values.timeZone}
                                >
                                    {arrTimeZones.map((timeZone) =>{
                                        let strTime = date.toLocaleString("en-US",{timeZone: `${timeZone}`});
                                        
                                        return (
                                            <option value="">{timeZone} {strTime} {createOffset(date).utcTime}</option>
                                        )
                                    })}
                                </Form.Select>
                            </InputGroup>
                        </Col>
                    </Row> */}

                    <Row className="mb-3">
                        <Col>
                            <InputGroup>
                                <Form.Check
                                    id="allDay"
                                    name="allDay"
                                    type="checkbox"
                                    label="All Day"
                                    onClick={()=>setShow(!show)}
                                    onChange={handleChange}
                                    value={values.allDay}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    
                    <Form.Group className="mb-5">
                        <Row className='align-items-center mb-3'>
                            <Col>
                                {/* Start date selector */}
                                <Form.Label htmlFor="start">Start Date</Form.Label>
                                <InputGroup>
                                    <DatePicker
                                        id="start"
                                        name="start"
                                        format="dd- MM- y"
                                        clearIcon={null}
                                        className='cla-picker'
                                        onChange={e => setCalStartDate(e)}
                                        value={calStartDate}
                                    />
                                </InputGroup>
                            </Col>
                            {show? false :
                                <Col>
                                    <Form.Label htmlFor="startTime"> Start Time</Form.Label>
                                    <InputGroup id="startTime" name="startTime">
                                        <Form.Control
                                            aria-label="Hour"
                                            id="calStartHours"
                                            name="calStartHours"
                                            type='number'
                                            min="0"
                                            max="23"
                                            onChange={handleChange}
                                            value={values.calStartHours}
                                        />
                                        <Form.Control
                                            aria-label="Hour"
                                            id="calStartMin"
                                            name="calStartMin"
                                            type='number'
                                            min="0"
                                            max="59"
                                            step='15'
                                            onChange={handleChange}
                                            value={values.calStartMin}
                                        />
                                    </InputGroup>
                                </Col>
                            }
                        </Row>
                        
                        <Row className='align-items-center'>
                            <Col>
                                {/* End date selector */}
                                <Form.Label htmlFor="end">End Date</Form.Label>
                                <InputGroup>
                                    <DatePicker
                                        id="end"
                                        name="end"
                                        format="dd- MM- y"
                                        clearIcon= {null}
                                        className='cla-picker'
                                        onChange={e=> setCalEndDate(e)}
                                        value={calEndDate}
                                    />
                                </InputGroup>
                            </Col>
                            {show? false :
                                <Col>
                                    <Form.Label htmlFor="EndTime"> End Time</Form.Label>
                                    <InputGroup id="EndTime" name="endTime">
                                        <Form.Control
                                            aria-label="Hour"
                                            id="calEndHours"
                                            name="calEndHours"
                                            type='number'
                                            min="0"
                                            max="23"
                                            onChange={handleChange}
                                            value={values.calEndHours}
                                        />
                                        <Form.Control
                                            aria-label="Hour"
                                            id="calEndMin"
                                            name="calEndMin"
                                            type='number'
                                            min="0"
                                            max="59"
                                            step="15"
                                            onChange={handleChange}
                                            value={values.calEndMin}
                                        />
                                    </InputGroup>
                                </Col>
                            }
                        </Row>
                    </Form.Group>                    
                
                    <Button type="submit" variant="primary">Submit</Button>
                </form>
            )}
        </Formik>
    );
};
export default CalForm;