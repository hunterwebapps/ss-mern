const Logger = store => next => action => {
    console.log("Redux Logger", `Action: ${action.type}`, action);
    next(action);
}

export default Logger;