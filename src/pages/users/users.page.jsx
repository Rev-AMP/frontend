import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { FetchUsers } from 'redux/user/action';
import {DataGrid} from '@material-ui/data-grid'

const columns =[
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'full_name', headerName: 'Full name', width: 250 },
    {
      field: 'email',
      headerName: 'Email',
      width: 300
    },
    {
      field: 'type',
      headerName: 'Type',
    },
  ];
class Users extends React.Component {
    constructor(props){
        super(props);
        this.state={
            //TODO: Configure for Modal
        }
    }
    componentDidMount(){
        this.props.FetchUsers();
    }
    render (){
        if(this.props.users){
            return (
                <div  style={{minWidth:"60vw",minHeight:"70vh",marginLeft:"10vw", marginTop:"5vh"}}>
                    <DataGrid rows={this.props.users} columns={columns}/>
                </div>
            )
        }
        return null
    }
}

const mapStateToProps=(state) => ({
    users:state.user.users
});

export default withRouter(connect(mapStateToProps,{FetchUsers})(Users));