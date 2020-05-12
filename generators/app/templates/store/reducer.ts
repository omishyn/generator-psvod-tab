import {assoc, pipe} from 'ramda';
import {Grouping, LoadingStatus} from '@shared/types/common';
import {status} from '@shared/constants/common';
import {PAGE_TAB_NAMEActions} from '@store/PAGE_TAB_DIR/actions';

export interface PAGE_TAB_NAMEState {
	selectedGrouping: Grouping;
	data: any;
	dataLoadingStatus: LoadingStatus;
	tableData: any;
	tableDataLoadingStatus: LoadingStatus;
}

const initialPAGE_TAB_NAMEState: PAGE_TAB_NAMEState = {
	tableData: null,
	tableDataLoadingStatus: status.default,
	selectedGrouping: null,
	data: null,
	dataLoadingStatus: status.default
};

export function page_TAB_NAMEReducer(state = initialPAGE_TAB_NAMEState, action) {
	switch (action.type) {
		case PAGE_TAB_NAMEActions.TYPES.GET_TABLE_DATA.REQUESTED:
			return assoc('tableDataLoadingStatus', status.loading, state);
		case PAGE_TAB_NAMEActions.TYPES.GET_TABLE_DATA.SUCCEEDED:
			return pipe(assoc('tableDataLoadingStatus', status.loaded), assoc('tableData', action.payload))(state);
		case PAGE_TAB_NAMEActions.TYPES.GET_TABLE_DATA.FAILED:
			return assoc('tableDataLoadingStatus', status.error(action.payload), state);

		case PAGE_TAB_NAMEActions.TYPES.GET_CHART_DATA.REQUESTED:
			return assoc('dataLoadingStatus', status.loading, state);
		case PAGE_TAB_NAMEActions.TYPES.GET_CHART_DATA.SUCCEEDED:
			return pipe(assoc('dataLoadingStatus', status.loaded), assoc('data', action.payload))(state);
		case PAGE_TAB_NAMEActions.TYPES.GET_CHART_DATA.FAILED:
			return assoc('dataLoadingStatus', status.error(action.payload), state);

		case PAGE_TAB_NAMEActions.TYPES.SET_GROUPING:
			return assoc('selectedGrouping', action.payload, state);

		default:
			return state;
	}
}
