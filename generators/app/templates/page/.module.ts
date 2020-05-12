import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpandableCardModule} from '@shared/components/expandable-card/expandable-card.module';
import {PAGE_TAB_NAMEContainer} from '@pages/PAGE_TAB_DIR/PAGE_TAB_REF.container';
import {PAGE_TAB_NAMEComponent} from '@pages/PAGE_TAB_DIR/PAGE_TAB_REF.component';
import {PAGE_TAB_NAMETabRouterModule} from '@pages/PAGE_TAB_DIR/PAGE_TAB_REF.router';

@NgModule({
	declarations: [PAGE_TAB_NAMEContainer, PAGE_TAB_NAMEComponent],
	imports: [
		CommonModule,
		PAGE_TAB_NAMETabRouterModule,
		ExpandableCardModule
	],
	exports: [PAGE_TAB_NAMEContainer]
})
export class PAGE_TAB_NAMETabModule {}
