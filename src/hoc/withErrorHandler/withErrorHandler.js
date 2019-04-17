import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        clickBackdropHandler = () => {
            this.setState({error: null});
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(config => {
                // Do something before request is sent
                this.setState({error: null});                
                return config;
            });

            // Add a response interceptor
            this.resInterceptor = axios.interceptors.response.use(response => {
                // Do something with response data
                return response;
            }, error => {
                this.setState({error: error});
                return Promise.reject(error);
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <Auxiliary>
                    <Modal show={this.state.error} backdropClicked={this.clickBackdropHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
}

export default withErrorHandler;