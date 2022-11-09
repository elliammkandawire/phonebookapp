import {Spinner} from "react-bootstrap";
import React from "react";

class Loader extends React.Component{
    render() {
        if(this.props.isSubmitting)
            return (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            );
        if(this.props.status)
            return (
                <div className="alert alert-success" role="alert">
                    {this.props.message}
                </div>

            );
        else if(this.props.status===false)
            return (

                <div className="alert alert-danger" role="alert">
                    {this.props.message}
                </div>

            );
        else
            return (
                <div>
                </div>
            )
    }
}

export default Loader;