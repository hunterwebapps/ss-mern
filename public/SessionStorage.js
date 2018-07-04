export const LoadState = () => {
    try {
        const savedState = sessionStorage.getItem('savedState');
        if (savedState === null) {
            return undefined;
        }
        return JSON.parse(savedState);
    } catch (err) { return undefined; }
}

export const SaveState = (state) => {
    try {
        const savedState = JSON.stringify(state);
        sessionStorage.setItem('savedState', savedState);
    } catch (err) { }
}