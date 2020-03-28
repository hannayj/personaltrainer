import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function Trainingcalendar(props){
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then (response => response.json())
        .then (data => {
            setEvents(data.map(event => (
                {
                title: event.activity + ' / ' + event.customer.firstname + ' ' + event.customer.lastname, 
                start: new Date(event.date), 
                end: new Date(new Date(event.date).setMinutes(new Date(event.date).getMinutes() + event.duration))
                }
            )));
        })
    }
    return(
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                onSelectEvent={event => alert(event.title + ' ' + moment(event.start).format('D.M.YYYY h:mm A') + '-' + moment(event.end).format('h:mm A'))}
                style={{ height: 700 }}
            />
        </div>
    );
}