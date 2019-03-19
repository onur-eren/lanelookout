import {
  SET_REPORT_STATUS,
  SET_REPORT_IMAGE,
  SET_REPORT_COORDS,
  GET_USER_LOCATION,
  HANDLE_IMAGE_UPLOAD,
  HANDLE_REPORT_UPLOAD,
} from "../../constants/actionsNames";

export const setReportStatus = (status) => ({
  type: SET_REPORT_STATUS,
  payload: status,
});

export const setReportImage = (image) => ({
  type: SET_REPORT_IMAGE,
  payload: image,
});

export const setReportCoords = (coords) => ({
  type: SET_REPORT_COORDS,
  payload: coords,
});

export const getUserLocation = () => ({
  type: GET_USER_LOCATION,
});

export const handleImageUpload = (image) => ({
  type: HANDLE_IMAGE_UPLOAD,
  payload: image,
});

export const handleReportUpload = (report) => ({
  type: HANDLE_REPORT_UPLOAD,
  payload: report,
});
