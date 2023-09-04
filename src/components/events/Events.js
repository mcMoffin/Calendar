import React, { useContext, useState, useEffect } from 'react';
import './event.css';
import { RootContext } from '../utils/context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCalendar, faCircleInfo, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Container, Form, InputGroup, Row, Col, Button } from 'react-bootstrap';
import dayjs from "dayjs";

const Event = () => {
    const { rootState } = useContext(RootContext);
    const [link, setLink] = useState('');
    const [linkOpen, setLinkOpen] = useState(false);

    useEffect(() => {
        const newStartDate = dayjs(`${rootState.start.getFullYear()}, ${rootState.start.getMonth()}, ${rootState.start.getDate()}, ${rootState.start.getUTCHours() +':'+ rootState.start.getUTCMinutes()}`);
        const newEndDate = dayjs(`${rootState.end.getFullYear()}, ${rootState.end.getMonth()}, ${rootState.end.getDate()}, ${rootState.end.getUTCHours() +':'+ rootState.end.getUTCMinutes()}`);
    
        if (linkOpen == 'outlook') {
            setLink(`https://outlook.live.com/calendar/0/action/compose?allday=${rootState.allDay}&body=${linkRegex(rootState.description)}&enddt=${rootState.allDay? dayjs(rootState.end).format('YYYY-MM-DD[T04%3A00%3A00%2B00%3A00]') : newEndDate.format('YYYY-MM-DD[T]HH[%3A]mm[%3A00%2B00%3A00]')}&location=${linkRegex(rootState.location)}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${rootState.allDay? dayjs(rootState.start).format('YYYY-MM-DD[T04%3A00%3A00%2B00%3A00]') : newStartDate.format('YYYY-MM-DD[T]HH[%3A]mm[%3A00%2B00%3A00]')}&subject=${linkRegex(rootState.title)}`);            
        }
        else if (linkOpen == 'gmail') {
            setLink(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${rootState.allDay? dayjs(rootState.start).format('YYYYMMDD') : newStartDate.format('YYYYMMDDTHHmmss[Z]')}%2F${rootState.allDay? dayjs(rootState.end).format('YYYYMMDD') :  newEndDate.format('YYYYMMDDTHHmmss [Z]')}&details=${linkRegex(rootState.description)}&location=${linkRegex(rootState.location)}&text=${linkRegex(rootState.title)}`);
        }
    },[rootState,linkOpen])

    const linkRegex = (e) => {
        const title = e.replaceAll(/[\%]/gi, '%25')
            .replaceAll(/[^\S]/gi, '%20')
            .replace(/[\!]/gi, '%21')
            .replaceAll(/[\@]/gi, '%40')
            .replaceAll(/[\#]/gi, '%23')
            .replaceAll(/[\$]/gi, '%24')
            .replaceAll(/[\^]/gi, '%5E')
            .replaceAll(/[\&]/gi, '%26')
            .replaceAll(/[\*]/gi, '%2A')
            .replaceAll(/[\(]/gi, '%28')
            .replaceAll(/[\)]/gi, '%29')
            .replaceAll(/[\=]/gi, '%3D')
            .replaceAll(/[\+]/gi, '%2B')
            .replaceAll(/[\\]/gi, '%5C')
            .replaceAll(/[\|]/gi, '%7C')
            .replaceAll(/[\[]/gi, '%5B')
            .replaceAll(/[\{]/gi, '%7B')
            .replaceAll(/[\]]/gi, '%5D')
            .replaceAll(/[\}]/gi, '%7D')
            .replaceAll(/[\;]/gi, '%3B')
            .replaceAll(/[\:]/gi, '%3A')
            .replaceAll(/[\']/gi, '%27')
            .replaceAll(/[\"]/gi, '%22')
            .replaceAll(/[\,]/gi, '%2C')
            .replaceAll(/[\<]/gi, '%3C')
            .replaceAll(/[\>]/gi, '%3E')
            .replaceAll(/[\/]/gi, '%2F')
            .replaceAll(/[\?]/gi, '%3F')
            .replaceAll(/[\\]/gi, '%5C')
        return title;
    }

    /*
        * Creates and downloads an ICS file
        * @params {string} timeZone - In the format America/New_York
        * @params {object} startTime - Vaild JS Date object in the event timezone
        * @params {object} endTime - Vaild JS Date object in the event timezone
        * @params {string} title
        * @params {string} description
        * @params {string} venueName
        * @params {string} address
        * @params {string} city
        * @params {string} state
    */

const icsBody = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:Calendar
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VTIMEZONE
TZID:${Intl.DateTimeFormat().resolvedOptions().timeZone}
END:VTIMEZONE
BEGIN:VEVENT
SUMMARY:${rootState.title}
UID:@DefaultSEQUENCE:0
STATUS:CONFIRMED
TRANSP:TRANSPARENT
DTSTART;TZID=${Intl.DateTimeFormat().resolvedOptions().timeZone}:${rootState.allDay ? dayjs(rootState.start).format('YYYYMMDD') : dayjs(rootState.start).format('YYYYMMDDTHHmm[00]')}
DTEND;TZID=${Intl.DateTimeFormat().resolvedOptions().timeZone}:${rootState.allDay ? dayjs(rootState.end).format('YYYYMMDD') : dayjs(rootState.end).format('YYYYMMDDTHHmm[00]')}
DTSTAMP:new Date()
LOCATION:${rootState.location}
DESCRIPTION:${rootState.description}
END:VEVENT
END:VCALENDAR`;

    return(        
        <Container className='event'>
            <Row className='event-title text-center mb-3 p-3 pt-5'>
                <h2>Event</h2>
            </Row>
            <Row direction="horizontal" gap={5} className='align-items-start flex-wrap mb-3'>
                <Col sm='2'>                
                    <FontAwesomeIcon icon={faCalendar} className='purple'/>
                </Col>
                <Col>
                    <div>
                        <h3>{rootState.title}</h3>
                        <p><strong>Start:</strong> {dayjs(rootState.start).format('DD-MM-YYYY - HH:mm')} </p>
                        <p><strong>End:</strong> {dayjs(rootState.end).format('DD-MM-YYYY - HH:mm')}</p>
                        { rootState.allDay? <p>All day event</p>:''}
                    </div>
                </Col>
            </Row>
            <Row direction="horizontal" gap={5} className='align-items-start flex-wrap'>
                <Col sm='2'>                
                    <FontAwesomeIcon icon={faLocationDot} className='purple' />
                </Col>
                <Col>
                    <div>
                        <p>{rootState.location}</p>
                    </div>
                </Col>
            </Row>
            <Row direction="horizontal" gap={5} className='align-items-start flex-wrap'>
                <Col sm='2'>                
                    <FontAwesomeIcon icon={faCircleInfo} className='purple' />
                </Col>
                <Col>
                    <div>
                        <p>{rootState.description}</p>
                    </div>
                </Col>
            </Row>

            {link ?
                <Row className='mb-3'>
                    <InputGroup>
                        <InputGroup.Text size='sm'>{link.match(/outlook/g)? "Outlook" : "GMail"}</InputGroup.Text>
                        <Form.Control
                            aria-label='link'
                            aria-describedby='basic-addon1'
                            disabled
                            value={link}
                        />
                        <Button
                            className='btn-purple-light'
                            onClick={()=> window.open(link, '_blank')}
                        >
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </Button>
                    </InputGroup>
                </Row>
            : false}

            <Row>
                
                
                <Col className='d-flex justify-content-around mb-2 flex-wrap gap-1'>
                    <Button type="button" variant="primary" onClick={() => {
                        setLinkOpen('gmail');
                    }}>Gmail</Button>
                
                    <Button type="button" variant="primary" onClick={() => {
                        setLinkOpen('outlook');
                    }}>Outlook</Button>
                
                    <a
                        href={`data:text/plain;charset=utf-8,` + encodeURIComponent(icsBody)}
                        download={`${rootState.title}.ics`}
                        rel="noopener noreferrer"
                    >
                        <Button type="button" variant="primary" className='btn-purple-light' onClick={() => {
                            setLink(false);
                            setLinkOpen(false);
                        }}>Download .ics</Button>
                    </a>
                </Col>                
            </Row>
            
        </Container>
        
    )
}
export default Event;