import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {filter, mapTo, switchMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {PAGE_TAB_NAMEActions} from '@store/PAGE_TAB_DIR/actions';
import {PAGE_TAB_NAMEApiService} from '@shared/api/PAGE_TAB_DIR/PAGE_TAB_REF.api.service';
import {PAGE_TAB_NAMESelectors} from '@store/PAGE_TAB_DIR/selectors';

@Injectable()
export class PAGE_TAB_NAMEEffects {

	constructor(
		private actions$: Actions,
    private store: Store<AppState>,
		private apiService: PAGE_TAB_NAMEApiService
	) {}
}
