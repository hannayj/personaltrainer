import React, { useState, useEffect, forwardRef } from 'react';
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
import Addtraining from './Addtraining';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [success, setSuccess] = useState({open: false, message: ''});

  const handleClose = () => {
    setSuccess(false);
   };

  useEffect(() => fetchData(), []);

  const fetchData = () => {
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then (response => response.json())
      .then (data => setCustomers(data.content)
      )
  }
    
  const deleteCustomer = (link) => {
      //console.log(link)
      fetch (link, {method: 'DELETE'})
      .then (response => {
        setSuccess({open: true, message: 'Customer deleted'});
        fetchData();
      })
      .catch (err => {
        console.error(err)
      })
  }

  const saveCustomer = (customer) => {
    //console.log(customer);
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(customer)
    })
    .then(response => {
      setSuccess({open: true, message: 'New customer added'});
      fetchData();
    })
    .catch(err => {
      console.error(err)
    })
  }

  const editCustomer = (customer, link) => {
    //console.log(link);
    fetch(link, {            
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(customer)   
    })
    .then(response => {
      setSuccess({open: true, message: 'Customer edited'});
      fetchData();
    })
    .catch(err => {
      console.error(err)
    })
  }

  const addTraining = (training) => {
    //console.log(training)
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(training) 
    })
    .then(response => {
      setSuccess({open: true, message: 'New training added.'});  
      fetchData()
    })
    .catch(err => {
      console.error(err)
    })
  }

  const columns = [
    {
      editable: 'never',
      field: 'links[0].href',
      render: rowData => <Addtraining addTraining={addTraining} customer={rowData}/>,
    },
    {
      title: 'First name',
      field: 'firstname'
    },
    {
      title: 'Last name',
      field: 'lastname'
    },
    {
      title: 'Street address',
      field: 'streetaddress'
    },
    {
      title: 'Postcode',
      field: 'postcode'
    },
    {
      title: 'City',
      field: 'city'
    },
    {
      title: 'Email',
      field: 'email'
    },
    {
      title: 'Phone',
      field: 'phone'
    },
    {
      title: 'id',
      field: 'links[0].href',
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
        title="Customers"
        columns={columns}
        data={customers}
        options={{sorting: true, pageSize: 10}}
        icons={tableIcons}
        editable={{
          onRowAdd: customer =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //console.log(customer);
                saveCustomer(customer);
                resolve()
              }, 1000)
            }),
          onRowUpdate: customers =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //console.log(customers);
                editCustomer(customers, customers.links[0].href);
                resolve()
              }, 1000)
            }),
          onRowDelete: customers =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //console.log(customers.links[0].href);
                deleteCustomer(customers.links[0].href);
                resolve()
              }, 1000)
            }),
          }}
      />
      <Snackbar open={success.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {success.message}
        </Alert>
      </Snackbar>
    </div>
  );
}