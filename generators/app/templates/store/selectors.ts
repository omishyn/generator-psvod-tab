import {AppState} from '@store/rootReducer';
import {createSelector} from 'reselect';

const getState = (state: AppState) => state.page_TAB_NAME;

const getChartData = createSelector(getState, (state) => state.data);

const getChartDataLoadingStatus = createSelector(getState, (state) => state.dataLoadingStatus);

const getSelectedGrouping = createSelector(getState, (state) => state.selectedGrouping);

const getTableDataLoadingStatus = createSelector(getState, (state) => state.tableDataLoadingStatus);

const getTableData = createSelector(getState, (state) => state.tableData);

export const page_TAB_NAMESelectors = {
	chart: {
		data: getChartData,
		loadingStatus: getChartDataLoadingStatus
	},
	table: {
		data: getTableData,
		loadingStatus: getTableDataLoadingStatus
	},
	selectedGrouping: getSelectedGrouping
};
