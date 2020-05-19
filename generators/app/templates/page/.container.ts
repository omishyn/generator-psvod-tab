import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Grouping, LoadingStatus} from '@shared/types/common';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {waitForGlobalFiltersUntilDestroy} from '@shared/helpers/store/effects.helper';
import {PAGE_TAB_NAMEActions} from '@store/PageTabDir/actions';
import {page_TAB_NAMESelectors} from '@store/PageTabDir/selectors';

@Component({
	selector: 'PAGE_TAB_REF',
	template: `<PAGE_TAB_REF-component
		[chartData]="chartData$ | async"
		[chartLoadingStatus]="chartLoadingStatus$ | async"
		[groupings]="groupings"
		[grouping]="grouping$ | async"
		(changeGrouping)="onChangeGrouping($event)"
	></PAGE_TAB_REF-component>
`})
export class PAGE_TAB_NAMEContainer implements OnInit, OnDestroy {
  chartData$: Observable<any>;
  chartLoadingStatus$: Observable<LoadingStatus>;
	groupings = [];
	grouping$: Observable<Grouping>;

	constructor(private store: Store<AppState>) {
		this.chartData$ = this.store.select(page_TAB_NAMESelectors.chart.data);
		this.chartLoadingStatus$ = this.store.select(page_TAB_NAMESelectors.chart.loadingStatus);
		this.grouping$ = this.store.select(page_TAB_NAMESelectors.selectedGrouping);
	}

	ngOnInit() {
		waitForGlobalFiltersUntilDestroy.call(this).subscribe(() => {
			this.store.dispatch(new PAGE_TAB_NAMEActions.GetChartData());
			this.store.dispatch(new PAGE_TAB_NAMEActions.GetTableData());
		});
	}

	onChangeGrouping(grouping: Grouping) {
		this.store.dispatch(new PAGE_TAB_NAMEActions.SetGrouping(grouping));
	}

	ngOnDestroy(): void {}
}
