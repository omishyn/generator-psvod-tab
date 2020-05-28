import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {filter, mapTo, switchMap, withLatestFrom} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {PAGE_TAB_NAMEActions} from '@store/PAGE_TAB_DIR/actions';
import {PAGE_TAB_NAMEApiService} from '@shared/api/PAGE_TAB_DIR/PAGE_TAB_REF.api.service';
import {page_TAB_NAMESelectors} from '@store/PAGE_TAB_DIR/selectors';
import {topFiltersSelectors} from '@store/top-filters/selectors';
import {FiltersForApi} from '@shared/interfaces/common';
import {Service} from '@shared/types/common';
import {Country, Platform} from '@entities/top-filters/entity';
import {mapActions} from '@shared/helpers/store/effects.helper';

@Injectable()
export class PAGE_TAB_NAMEEffects {
  @Effect() getChartData = this.actions$.pipe(
    ofType(PAGE_TAB_NAMEActions.TYPES.GET_CHART_DATA.REQUESTED),
    withLatestFrom(
      this.store.select(topFiltersSelectors.forApiCall),
      this.store.select(topFiltersSelectors.services.all),
      this.store.select(topFiltersSelectors.platforms.all),
      this.store.select(topFiltersSelectors.countryGroups.all)
    ),
    switchMap(
      ([action, {serviceId, periodId}, allServices, allPlatforms, allCountries]: [
        Action,
        FiltersForApi,
        Service[],
        Platform[],
        Country[]
      ]) => {
        const params = {
          serviceId,
          periodId
        };

        return this.apiService
          .getChartData(params)
          .pipe(mapActions(PAGE_TAB_NAMEActions.TYPES.GET_CHART_DATA));
      }
    )
  );

	constructor(
		private actions$: Actions,
    private store: Store<AppState>,
		private apiService: PAGE_TAB_NAMEApiService
	) {}
}
