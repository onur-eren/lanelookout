import { connect } from 'react-redux';
import {
  selectReportStatus,
  selectReportImage,
  selectReportCoords,
} from '../../redux/report/selectors';
import {
  setReportStatus,
  setReportCoords,
  getUserLocation,
  handleImageUpload,
  handleReportUpload,
} from '../../redux/report/actions';
import ReportObstructionUI from './ui';

const mapState = (state) => ({
  status: selectReportStatus(state),
  image: selectReportImage(state),
  coords: selectReportCoords(state),
});

const mapDispatch = (dispatch) => ({
  setStatus: (status) => dispatch(setReportStatus(status)),
  setCoords: (coords) => dispatch(setReportCoords(coords)),
  getLocation: () => dispatch(getUserLocation()),
  uploadImage: (image) => dispatch(handleImageUpload(image)),
  uploadReport: (report) => dispatch(handleReportUpload(report)),  
});

const ReportObstruction = connect(mapState, mapDispatch)(ReportObstructionUI);

export default ReportObstruction;
