import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { UserService } from "../../services/user.service";
import { User, Post } from "../../models/user.model";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;
  accordionItems: any[] = [];
  posts: Post[] = [];
  loading = true;
  error = false;
  cardConfig: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get("id"));
    if (userId) {
      this.fetchData(userId);
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  fetchData(userId: number) {
    this.loading = true;
    this.error = false;

    forkJoin([
      this.userService.getUser(userId),
      this.userService.getUserPosts(userId),
    ]).subscribe({
      next: ([user, posts]) => {
        this.user = user;
        this.posts = posts;
        this.cardConfig = {
          header: {
            title: user.name,
          },
        };

        this.accordionItems = posts.map((post) => ({
          name: post.title,
          bodyText: post.body,
        }));

        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  deleteUser() {
    this.router.navigate(["/users"]);
  }

  goBack() {
    this.router.navigate(["/users"]);
  }
}
