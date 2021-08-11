import React from "react";
class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorDetail: null
        }
    }

    componentDidCatch(error, errorDetail) {
        this.setState({
            error: error,
            errorDetail: errorDetail
        })
    }

    render() {
        if (this.state.error) return (
            <div>
                < h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} > Oh Snap! This component doesn't feel good today. </h1>
            </div>
        )


        return this.props.children;
    }


}

export default ErrorBoundary;