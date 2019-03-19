import { UPLOAD } from "../../constants/report"
import { coordsOakland } from "../../constants/report";
import {
  SET_REPORT_STATUS,
  SET_REPORT_IMAGE,
  SET_REPORT_COORDS,
} from "../../constants/actionsNames";

const initialState = {
  status: UPLOAD,
  coords: coordsOakland,
  img_url: null,
};

const reportReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case SET_REPORT_STATUS:
      return { ...state, status: payload };
    case SET_REPORT_IMAGE:
      return { ...state, img_url: payload };
    case SET_REPORT_COORDS:
      return { ...state, coords: payload };
    default:
      return state;
  }
}

export default reportReducer;
