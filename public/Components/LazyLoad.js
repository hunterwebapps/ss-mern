import React from 'react';

const LazyLoad = (componentPath) => {
    console.log('componentPath', componentPath)
    return class extends React.Component {
        state = {
            component: null
        }

        componentDidMount() {
            import(componentPath).then(component => this.setState({ component }));
        }

        render() {
            console.log('rendered component', this.state.component);
            return this.state.component;
        }
    }
}

export default LazyLoad;