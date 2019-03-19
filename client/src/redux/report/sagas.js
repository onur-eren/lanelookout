import { put, call, select, takeLatest } from "redux-saga/effects";
import {
  GET_USER_LOCATION,
  HANDLE_IMAGE_UPLOAD,
  HANDLE_REPORT_UPLOAD,
} from "../../constants/actionsNames";
import {
  setReportImage,
  setReportCoords,
} from "./actions";
import {
  getUserLocation,
  doUploadImage,
  doUploadReport,
} from "./effects";

function* handleGetUserLocation() {
  try {
    const position = yield call(getUserLocation);
    yield put(setReportCoords({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }));
  } catch (error) {
    // todo: error handling
    console.error(`ERROR: ${error.message}`)
  }
}

function* handleImageUpload(action) {
  try {
    const result = yield call(doUploadImage, action.payload);
    yield put(setReportImage(result));
  } catch (error) {
    // todo: error handling
    console.error(`ERROR: ${error.message}`)
  }
}

function* handleReportUpload(action) {
  try {
    const result = yield call(doUploadReport, action.payload);
    // todo: what to do after upload?
    console.log("REPORT UPLOADED\n\n", action.payload, "\n\n", result);
  } catch (error) {
    // todo: error handling
    console.error(`ERROR: ${error.message}`)
  }
}

function* reportSagas() {
  yield takeLatest(GET_USER_LOCATION, handleGetUserLocation);
  yield takeLatest(HANDLE_IMAGE_UPLOAD, handleImageUpload);
  yield takeLatest(HANDLE_REPORT_UPLOAD, handleReportUpload);
}

export default reportSagas;
