import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService, User, Post } from "../../services/user.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  user: any;
  accordionItems: any[] = [];
  posts: Post[] = [];
  loading = true;
  error = false;

  // 1. Criamos a variável que vai guardar a configuração do card
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

        // 2. Montamos o objeto de configuração do ion-card com o nome do usuário
        this.cardConfig = {
          header: {
            title: user.name
          }
        };

        this.accordionItems = posts.map(post => ({
          name: post.title,
          bodyText: post.body
        }));

        this.loading = false;
      },
      error: (err) => {
        console.error("Erro ao carregar dados:", err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  deleteUser() {
    // Esse alert vai provar que o popconfirm funcionou!
    alert("Usuário excluído com sucesso!");

    console.log("Usuário excluído com sucesso no console!");
    this.router.navigate(["/users"]);
  }
  goBack() {
    this.router.navigate(["/users"]);
  }
}
