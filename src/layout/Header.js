import React, { Component } from 'react';
import GlobalHeader from '../components/GlobalHeader/index'
export default class Header extends Component{
    handleNoticeClear = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/clearNotices',
        });
    };
    render() {
        return(
                <GlobalHeader
                    onNoticeClear={this.handleNoticeClear}
                />
        )
    }
}