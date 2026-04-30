import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./pages/home/home.module#HomeModule",
    pathMatch: "full",
  },
  {
    path: "users",
    loadChildren: "./pages/users/users.module#UsersModule",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
