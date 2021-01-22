import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid'

import { FetchUsers } from 'redux/user/action';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'full_name', headerName: 'Full name', width: 250 },
    {
        field: 'email',
        headerName: 'Email',
        width: 300
    },
    {
        field: 'profile_picture',
        headerName: 'Profile',
        width: 120,
        renderCell: (params) => (
            <img src={`${ params.value }`} width={ 100 } height={ 100 } alt="Nothing here" />
        )
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 250,
        flex: 1.5
    },

];

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //TODO: Configure for Modal
        }
    }

    componentDidMount() {
        this.props.FetchUsers();
    }

    render() {
        if (this.props.users) {
            return (
                <div style={{ minHeight: "70vh" }}>
                    <DataGrid rows={ this.props.users } columns={ columns } rowHeight={ 120 } />
                </div>
            )
        }
        return null;
    }
}

const mapStateToProps = (state) => ({
    users: state.user.users
});

export default withRouter(connect(mapStateToProps, { FetchUsers })(Users));