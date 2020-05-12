import {
	getActionDescription,
	getDataLoadingActionDescriptionsForGivenModule
} from '@shared/helpers/store/actions.helper';
import {Action} from '@ngrx/store';
import {Grouping} from '@shared/types/common';

export namespace PAGE_TAB_NAMEActions {
	const moduleName = 'PAGE_NAME - TAB_NAME';
	const getDataLoadingActionDescriptions = getDataLoadingActionDescriptionsForGivenModule(moduleName);

	export const TYPES = {
		GET_CHART_DATA: getDataLoadingActionDescriptions('TAB_NAME'),
		GET_TABLE_DATA: getDataLoadingActionDescriptions('Table'),
		SET_GROUPING: getActionDescription(moduleName, 'TAB_NAME', 'Set grouping')
	};

	export class GetChartData implements Action {
		readonly type = TYPES.GET_CHART_DATA.REQUESTED;
	}

	export class GetTableData implements Action {
		readonly type = TYPES.GET_TABLE_DATA.REQUESTED;
	}

	export class SetGrouping implements Action {
		readonly type = TYPES.SET_GROUPING;

		constructor(public payload: Grouping) {}
	}
}
