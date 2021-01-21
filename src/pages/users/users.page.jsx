import React from 'react';
import {withRouter} from 'react-router-dom';
import { FetchUsers } from 'redux/user/action';
import {DataGrid} from '@material-ui/data-grid'
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
                
                <DataGrid rows={this.props.users} />
            
            )
        }
        return null
    }
}

const mapStateToProps=(state) => ({
    users=state.user.users
});

export default withRouter(connect(mapStateToProps,{FetchUsers})(Users));