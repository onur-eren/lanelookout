import { createSelector } from "reselect";

export const reportState = state => state.report || {};

export const selectReportStatus = createSelector(reportState, report => report.status);

export const selectReportImage = createSelector(reportState, report => report.img_url);

export const selectReportCoords = createSelector(reportState, report => ({...report.coords}));
