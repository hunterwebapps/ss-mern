import { all } from 'redux-saga/effects';
import { watchMasterSaga } from './Modules/Master/Master.saga';
import { watchOperatingLocationsSaga } from './Modules/OperatingLocations/OperatingLocations.saga';
import { watchPackagesSaga } from './Modules/Packages/Packages.saga';
import { watchAddressesSaga } from './Modules/Addresses/Addresses.saga';
import { watchClientsSaga } from './Modules/Clients/Clients.saga';
import { watchUsersSaga } from './Modules/Users/Users.saga';
import { watchPagesSaga } from './Modules/Pages/Pages.saga';
import { watchSprintsSaga } from './Modules/Sprints/Sprints.saga';

export default function* mySaga() {
    yield all([
        ...watchMasterSaga,
        ...watchOperatingLocationsSaga,
        ...watchPackagesSaga,
        ...watchAddressesSaga,
        ...watchClientsSaga,
        ...watchUsersSaga,
        ...watchPagesSaga,
        ...watchSprintsSaga
    ]);
}