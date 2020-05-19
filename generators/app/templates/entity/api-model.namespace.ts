import {CustomPeriodApiParam, MappedByGranularity} from '@shared/types/common';
import {NamedSeriesData} from '@shared/types/chart-data';

export namespace PAGE_TAB_NAMEApiModel {
	export interface ChartSeries {
		categories: string[];
		total: NamedSeriesData[];
	}

	export interface RequestParams {
		serviceId: number[];
		periodId: number;
		platforms: number[];
		countryGroups?: number[];
		plans: string[];
		customPeriod?: CustomPeriodApiParam;
		compareToCustomPeriod?: CustomPeriodApiParam;
	}

	export interface Response {
		docs: {
			chart: MappedByGranularity<ChartSeries>;
      averageLines?: any
		};
	}
}
