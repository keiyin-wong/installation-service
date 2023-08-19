import moment from "moment";

export function convertUnixTimestampToMoment(unixTimestamp) {
    return moment(unixTimestamp).format("DD-MM-YYYY HH:mm:ss");
}

export function convertUnixTimestampToMomentDate(unixTimestamp) {
    return moment(unixTimestamp).format("DD-MMM-YYYY");
}