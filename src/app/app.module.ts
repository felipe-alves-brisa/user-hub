import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonModule, IonSidebarModule } from '@brisanet/ion';
import { HomeComponent } from './pages/home/home.component';

// Importação no topo
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    AddUserComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonModule,
    ReactiveFormsModule,
    IonSidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
