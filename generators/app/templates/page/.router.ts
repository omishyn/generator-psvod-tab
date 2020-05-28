import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PAGE_TAB_NAMEContainer} from '@pages/PAGE_TAB_DIR/PAGE_TAB_REF.container';

export const PAGE_TAB_NAMETabRoutes: Routes = [
	{
		path: 'tab_name',
		loadChildren: () => import('./PAGE_TAB_REF.module').then((m) => m.PAGE_TAB_NAMETabModule)
	}
];

const children: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: PAGE_TAB_NAMEContainer
	}
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(children)],
	exports: [],
	providers: []
})
export class PAGE_TAB_NAMETabRouterModule {}
