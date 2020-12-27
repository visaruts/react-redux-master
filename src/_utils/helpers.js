import _ from 'lodash';
import lang from '../_langs'
import rest from '../_utils/rest'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { store } from 'react-notifications-component';
import 'animate.css';
import 'react-notifications-component/dist/theme.css';

export const setAuthToken = token => {
    if (token) {
        // Apply to every request
        rest.defaults.headers.common['Authorization'] = 'bearer ' + token;
    } else {
        // Delete auth header
        delete rest.defaults.headers.common['Authorization'];
    }
}
function  NotificationManager  (type, title, content){
    store.addNotification({
        title: title,
        message: content,
        type: type,// 'default', 'success', 'info', 'warning'
        showIcon:true,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        // dismiss: { duration: 5000 },
        // dismissable: { click: true }
    })
}
export const createNotification = (type, content) => {
    switch (type) {
        case 'info':
            NotificationManager(type, "Info", content);
            break;
        case 'success':
            NotificationManager(type, "Success", content);
            break;
        case 'warning':
            NotificationManager(type, "Warning", content);
            break;
        case 'error':
            NotificationManager("danger", "Error", content);
            break;
    }
    
}

export const beforeRequest = () => dispatch => {
    // loading
    dispatch(showLoading('sectionBar'))
}

export const beforeResponse = () => dispatch => {
    // loading
    dispatch(hideLoading('sectionBar'))
}

export const urlExists = (url) => {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}

export const validateRequired = (data, filterData) => {
    let output = {}
    filterData.map(key => {
        if (_.has(data, key) && (data[key] === '' || data[key] === null || data[key] === undefined)) {
            output[key] = lang('required.' + key)
        }
    })

    return output;
}

export const findStatusText = data => status => {
    return _.findKey(data, status) ? true : false;
}

export const encodeUri = uri => {
    const str = uri.replace(" ", '%20')
    return encodeURIComponent(str)
}