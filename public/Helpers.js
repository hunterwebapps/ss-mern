import moment from 'moment';

export const RoundHourUp = date => {
    date.setHours(date.getHours() + 1);
    date.setMinutes(0);
    return date;
};

export const ParseSerializedDate = (serializedDate, format) => {
    let date = parseInt(serializedDate.substring(6));
    date = moment(date).format(format);
    return date;
};

export const ValidateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}