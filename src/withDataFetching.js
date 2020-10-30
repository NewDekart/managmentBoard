import React from 'react';

export default function withDataFetching(WrappedComponent) {
    class WithDataFetching extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                loading: true,
                error: ''
            }
        }

        componentDidMount() {
            fetch(this.props.dataSource)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        data,
                        loading: false
                    })
                })
                .catch((error) => {
                    this.setState({
                        loading: false,
                        error: error.message
                    })
                })
        }

        render() {
            const { data, loading, error } = this.state;

            return <WrappedComponent
                data={data}
                loading={loading}
                error={error}
                {...this.props}
            />
        }
    }

    WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;

    return WithDataFetching;
}
