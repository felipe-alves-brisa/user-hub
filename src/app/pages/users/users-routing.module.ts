import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserListComponent } from "../../pages/user-list/user-list.component";
import { AddUserComponent } from "../../pages/add-user/add-user.component";
import { UserDetailsComponent } from "../../pages/user-details/user-details.component";

const routes: Routes = [
  { path: "", component: UserListComponent },
  { path: "add", component: AddUserComponent },
  { path: ":id", component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
