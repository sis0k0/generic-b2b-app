import { Component, OnDestroy, OnInit } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";;
import { ListViewEventData } from "nativescript-ui-listview";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";

import { CustomersService } from "~/my-customers/shared/customers.service";
import { NavigationService } from "~/shared/services/navigation.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "CustomersList",
    moduleId: module.id,
    templateUrl: "./my-customers-list.component.html"
})
export class MyCustomersListComponent implements OnInit, OnDestroy {
    private _isLoading: boolean = false;
    private _customers: ObservableArray<any> = new ObservableArray<any>([]);
    private _dataSubscription: Subscription;

    constructor(
        private _customersService: CustomersService,
        private _navigationService: NavigationService,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        if (!this._dataSubscription) {
            this._isLoading = true;

            this._dataSubscription = this._customersService.load()
                .pipe(finalize(() => this._isLoading = false))
                .subscribe(customers => {
                    this._customers = new ObservableArray(customers);
                    this._isLoading = false;
                });
        }
    }

    ngOnDestroy(): void {
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
    }

    get customers(): ObservableArray<any> {
        return this._customers;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    onCustomerItemTap(args: ListViewEventData): void {
        const tappedCustomerItem = args.view.bindingContext;
        this._navigationService.relativeRouterNavigation(["../customer-detail", tappedCustomerItem._id], this._activatedRoute);
    }
}
