import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'moment';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fectchData(), []);

    const fectchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then (response => response.json())
        .then (data => {
            setTrainings(data);
        })
    }

    const columns = [
        {
            id: 'formattedDate',
            Header: 'Date',
            accessor: date => {
                return Moment(date.formatted)
                .format('DD.MM.YYYY hh:mm a')
            }
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            id: 'CustomerName',
            Header: 'Customer',
            accessor: name => name.customer.firstname + ' ' + name.customer.lastname
        },

    ]
    return(
        <div>
            <ReactTable sortable={true} filterable={true} data={trainings} columns={columns} />
        </div>
    );
}