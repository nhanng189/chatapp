import React, { Component } from 'react';
import { connect } from 'react-redux';

class Signin extends Component {
    render() {
        return (
            <img style={{ marginLeft: "auto", marginRight: "auto", marginTop: "50px", width: "100px", height: "100px" }}
                src="https://loading.io/spinners/coolors/lg.palette-rotating-ring-loader.gif" className="img-responsive" alt="loading" />
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
