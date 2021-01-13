import React from 'react';
import {connect} from 'react-redux';
import {Button } from 'reactstrap';
import { Increment,Decrement } from 'redux/demo-reducer/action';
import {withRouter} from 'react-router-dom';
class Demo extends React.Component {
    // constructor (props){
    //     super(props);
        
    // }
    render (){
        return (
            <>
            <div>{this.props.message}</div>
            <div>{this.props.value}</div>
            <Button color="primary" onClick={()=>this.props.Increment()}>Increment</Button>
            <Button color="danger" onClick={()=>this.props.Decrement()}>Decrement</Button>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    value:state.DemoReducer.value,
    message:state.DemoReducer.message
})

export default withRouter( 
    connect(mapStateToProps,{Increment,Decrement})(Demo)
);