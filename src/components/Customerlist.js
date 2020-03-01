import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fectchData(), []);

    const fectchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then (response => response.json())
        .then (data => {
            setCustomers(data.content);
        })
    }

    const columns = [
        {
            Header: 'First name',
            accessor: 'firstname'
        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        },
                {
            Header: 'Street address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
    ]
    return(
        <div>
            <ReactTable sortable={true} filterable={true} data={customers} columns={columns} />
        </div>
    );
}