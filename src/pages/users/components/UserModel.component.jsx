import React from 'react';
import { Modal, Paper, Grid, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';

import FormInput from 'components/FormInput/FormInput.component';
import { FetchUser, CreateUser, UpdateUser } from 'redux/user/action'
import Button from 'components/Button/Button.component';

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            submit: {},
        }
    }

    componentDidMount() {
        if (this.props.userId !== null && this.props.userId !== undefined) {
            this.props.FetchUser(this.props.userId);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.selectedUser !== prevProps.selectedUser) {
            this.setState({
                user: { ...this.props.selectedUser } ?? {}
            })
        }
    }

    handleInputChange = (event) => {

        let user = this.state.user;
        let submit = this.state.submit;
        let checkbox = event.target.type === "checkbox";
        user[event.target.name] = checkbox ? event.target.checked : event.target.value;
        submit[event.target.name] = user[event.target.name];
        this.setState({ user, submit });

    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { userId } = this.props;
        if (userId) {
            this.props.UpdateUser(userId, this.state.submit);
        } else {
            this.props.CreateUser(this.state.submit);
        }
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Modal open={this.props.isOpen} onClose={this.props.onClose}>
                    <Paper style={{
                        top: "50%",
                        left: "50%",
                        position: "absolute",
                        transform: "translate(-50%,-50%)",
                        display: "flex",
                        flexDirection: "column",
                        padding: 100
                    }} component={Grid} item>
                        <CircularProgress size="7em" />
                    </Paper>
                </Modal>
            );
        }

        return (
            <Modal open={this.props.isOpen} onClose={this.props.onClose}>
                <Paper style={{
                    top: "50%",
                    left: "50%",
                    position: "absolute",
                    transform: "translate(-50%,-50%)",
                    display: "flex",
                    flexDirection: "column"
                }} component={Grid} item>
                    <FormInput type="text" name="full_name" placeholder="Full Name" value={this.state.user.full_name ?? ""} onChange={this.handleInputChange} />
                    <FormInput type="email" name="email" placeholder="Email" value={this.state.user.email ?? ""} onChange={this.handleInputChange} />
                    <FormInput type="checkbox" name="is_active" color="primary" checked={this.state.user.is_active ?? false} onChange={this.handleInputChange} />
                    <FormInput type="text" name="type" placeholder="User Type" value={this.state.user.type ?? ""} onChange={this.handleInputChange} />
                    {/* <FormInput type="text" name="profile_picture" value={this.state.user.profile_picture??""} onChange={this.handleInputChange}></FormInput> */}
                    <FormInput type="password" name="password" placeholder="Password" value={this.state.user.password ?? ""} onChange={this.handleInputChange} />
                    <Button onClick={this.handleSubmit} color="primary" variant="contained">Submit</Button>
                </Paper>
            </Modal>

        )
    }
}


const mapStateToProps = (state) => ({
    selectedUser: state.user.selectedUser,
    isLoading: state.user.isLoading
})

export default connect(mapStateToProps, { FetchUser, CreateUser, UpdateUser })(EditModal);