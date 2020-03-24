import React, { useState, useEffect, forwardRef } from 'react';
import Moment from 'moment';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then (response => response.json())
    .then (data => {
      setTrainings(data);
    })
  }

  const deleteTraining = (id) => {
    console.log(id);
    fetch ('https://customerrest.herokuapp.com/api/trainings/' + id, {method: 'DELETE'})
    .then (response => fetchData())
    .catch (err => {
      console.error(err)
    })
  }

    const columns = [
      {
        title: 'Activity',
        field: 'activity'
      },  
      {
          id: 'formattedDate',
          title: 'Date',
          field: 'date',
          type: 'datetime',
          render: rowData => {
            return Moment(rowData.date)
            .local()
            .format('D.M.YYYY H:mm a')
        }
        },
        {
          title: 'Duration (min)',
          field: 'duration',
          //type: 'numeric',
        },

        {
          id: 'CustomerName',
          title: 'Customer',
          render: rowData => rowData.customer.firstname + ' ' + rowData.customer.lastname,
          customFilterAndSearch: (term, rowData) => (rowData.customer.firstname + ' ' + rowData.customer.lastname).indexOf(term) !== -1,
        },
        {
          field: 'id',
          hidden: true
        },
    ]
    
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  return(
    <div>
      <MaterialTable
        title="Trainings"
        columns={columns}
        data={trainings}
        options={{sorting: true, pageSize: 10}}
        icons={tableIcons}
        editable={{
          onRowDelete: training =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //console.log(training.id);
                deleteTraining(training.id);
                resolve()
              }, 1000)
            }),
        }}
      />
    </div>
  );
}