import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { AddUserComponent } from "./pages/add-user/add-user.component";
import { UserDetailsComponent } from "./pages/user-details/user-details.component";

import {
  IonAccordionModule,
  IonAlertModule,
  IonButtonModule,
  IonCardModule,
  IonCheckboxModule,
  IonInputModule,
  IonModalModule,
  IonModule,
  IonNoDataModule,
  IonNotificationModule,
  IonPaginationModule,
  IonSelectModule,
  IonSidebarModule,
  IonSpinnerModule,
  IonTableModule,
  IonTagModule,
  ionThemeInitializer,
} from "@brisanet/ion";
import { UserModalComponent } from "./pages/user-list/user-modal/user-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    AddUserComponent,
    UserDetailsComponent,
    UserModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonModule,
    IonButtonModule,
    ReactiveFormsModule,
    IonSidebarModule,
    IonNoDataModule,
    IonSpinnerModule,
    IonTableModule,
    IonPaginationModule,
    IonAlertModule,
    IonInputModule,
    IonSelectModule,
    IonCheckboxModule,
    IonTagModule,
    IonCardModule,
    IonAccordionModule,
    IonModalModule,
    IonNotificationModule
  ],
  providers: [ionThemeInitializer()],
  bootstrap: [AppComponent], 
  entryComponents: [UserModalComponent]
})
export class AppModule {}
