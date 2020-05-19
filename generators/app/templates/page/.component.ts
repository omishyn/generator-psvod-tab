import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {Grouping, LoadingStatus} from '@shared/types/common';
import {ExportChartSubjects} from '@shared/types/subscribers-chart';
import {BehaviorSubject} from 'rxjs';
import {CHART_NAMES} from '@shared/constants/common';
import {ExportHelper} from '@shared/helpers/export/general.export.helper';

@Component({
	selector: 'PAGE_TAB_REF-component',
	templateUrl: './PAGE_TAB_REF.component.html',
	styleUrls: ['./PAGE_TAB_REF.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PAGE_TAB_NAMEComponent implements OnDestroy, OnChanges {
	@Input() chartData: any;
	@Input() chartLoadingStatus: LoadingStatus;

	@Output() changeGrouping = new EventEmitter<Grouping>();

	chartNames = CHART_NAMES.page_NAME.tab_NAME;

	exportXlsx$: ExportChartSubjects = {
		[this.chartNames.name]: new BehaviorSubject('')
	};

	ngOnChanges(changes: SimpleChanges) {

	}

	ngOnDestroy(): void {
		ExportHelper.completeAllExportSubscriptions(this.exportXlsx$);
	}

	onExportXlsx(cardName: string, chartName: string) {
		ExportHelper.triggerExportGeneration(this.exportXlsx$, chartName, cardName);
	}
}
