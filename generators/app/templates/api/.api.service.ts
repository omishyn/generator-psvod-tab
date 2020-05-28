import {Injectable} from '@angular/core';
import {ApiService} from 'amc-common-components/lib/index';
import {Grouping, PeriodEnum} from '@shared/types/common';
import {getLastNonNullIndexForSeries, sliceNamedSeriesData} from '@shared/helpers/common.helper';
import {Observable, of} from 'rxjs';
import {clone} from 'ramda';
import {CHART_DATA} from '@shared/api/PAGE_TAB_DIR/mock';
import {PAGE_TAB_NAMEApiModel} from '@entities/PAGE_TAB_DIR/api-model.namespace';

@Injectable()
export class PAGE_TAB_NAMEApiService extends ApiService {
	static mapData(
		granularity: PeriodEnum,
		grouping: Grouping,
		response: PAGE_TAB_NAMEApiModel.Response
	): any {
		if (!response.docs) {
			return null;
		}

		console.log({granularity, grouping});

		// console.log(JSON.stringify(response.docs));

		const docs = response.docs;
		const key = 'chart';
		let chart = docs[key] && clone(docs[key][granularity]);

		if (chart) {
			const lastTotalIndex = getLastNonNullIndexForSeries(chart.total);
			const lastStartsIndex = getLastNonNullIndexForSeries(chart.starts);

			chart = {
				totalCategories: chart.categories.slice(0, lastTotalIndex + 1),
				total: sliceNamedSeriesData(chart.total, 0, lastTotalIndex + 1),
				startsCategories: chart.categories.slice(0, lastStartsIndex + 1),
				starts: sliceNamedSeriesData(chart.starts, 0, lastStartsIndex + 1)
			};
		}

		const out = {
			chart,
			averageLines: docs.averageLines,
			showAverageLines: granularity === PeriodEnum.Day
		};

		// console.log(JSON.stringify(out));

		return out;
	}

	getData(
		params: PAGE_TAB_NAMEApiModel.RequestParams,
		granularity: PeriodEnum,
		grouping: Grouping
	): Observable<any> {
	  // as sample, 'acquisitionTrials.getAcquisitionTrialsGrid'
		// return super.post(
		// 	'page_NAME.getPAGE_TAB_NAMEChartData',
		// 	params,
		// 	false,
		// 	PAGE_TAB_NAMEApiService.mapData.bind(null, granularity, grouping)
		// );

		return of(PAGE_TAB_NAMEApiService.mapData(granularity, grouping, CHART_DATA));
	}

  getChartData(params: {}): Observable<any> {
    return super.post(
      'page_NAME.getPAGE_TAB_NAME',
      params,
      false,
      res => res.docs
    );
  }
}
