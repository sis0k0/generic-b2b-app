import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CustomersDetailComponent } from "~/master-details/customers-detail/customers-detail.component";
import { CustomersListComponent } from "~/master-details/customers-list.component";

const routes: Routes = [
    { path: "", redirectTo: "customer-list" },
    { path: "customer-list", component: CustomersListComponent },
    { path: "customer-detail/:id", component: CustomersDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CustomersRoutingModule { }
