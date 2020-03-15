import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
//import react-big-calendar/lib/css/react-big-calendar.css;

export default function Calendar(props){
    const localizer = BigCalendar.momentLocalizer(moment);

    let allViews = Object.keys(Views).map(k => Views[k])

    const ColoredDateCellWrapper = ({ children }) =>
        React.cloneElement(React.Children.only(children), {
            style: {
            backgroundColor: 'lightblue',
            },
        })

    return(
        <div>
            <BigCalendar
                localizer={localizer}
                events={trainings}
                views={allViews}
                step={60}
                showMultiDayTimes
                components={{
                    timeSlotWrapper: ColoredDateCellWrapper,
                  }}
                //startAccessor="start"
                //endAccessor="end"
            />
        </div>
    );
}