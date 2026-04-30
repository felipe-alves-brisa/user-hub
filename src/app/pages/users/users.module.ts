import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { UsersRoutingModule } from "./users-routing.module";
import { UserListComponent } from "../../pages/user-list/user-list.component";
import { AddUserComponent } from "../../pages/add-user/add-user.component";
import { UserDetailsComponent } from "../../pages/user-details/user-details.component";
import { UserModalComponent } from "../../pages/user-list/user-modal/user-modal.component";

@NgModule({
  declarations: [
    UserListComponent,
    AddUserComponent,
    UserDetailsComponent,
    UserModalComponent,
  ],
  imports: [SharedModule, UsersRoutingModule],
  entryComponents: [UserModalComponent],
})
export class UsersModule {}
