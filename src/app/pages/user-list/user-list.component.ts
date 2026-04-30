import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IonModalService, IonNotificationService } from "@brisanet/ion";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { UserModalComponent } from "./user-modal/user-modal.component";

type UserTableRow = User & { "company.name": string };

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  allUsers: UserTableRow[] = [];
  loading = true;
  error = false;

  paginationConfig = {
    total: 0,
    itemsPerPage: 5,
    page: 1,
  };

  tableConfig: any = {
    data: [],
    loading: true,
    columns: [
      {
        key: "name",
        label: "Nome",
        sort: true,
        type: "link",
        link: {
          label: (row: UserTableRow) => row.name,
          action: (row: UserTableRow) => this.goToDetails(row),
        },
      },
      { key: "email", label: "E-mail", sort: true },
      { key: "company.name", label: "Empresa", sort: false },
    ],
    actions: [
      {
        label: "Editar",
        icon: "pencil",
        call: (row: UserTableRow) => this.editUser(row),
        tooltip: "Editar usuário",
      },
      {
        label: "Excluir",
        icon: "trash",
        danger: true,
        confirm: {
          title: "Confirmar Exclusão",
          description: "Tem certeza que deseja excluir este usuário?",
          confirmText: "Sim, excluir",
          cancelText: "Cancelar",
        },
        call: (row: UserTableRow) => this.deleteUser(row),
      },
    ],
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: IonModalService,
    private notificationService: IonNotificationService,
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.error = false;
    this.loading = true;

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.allUsers = data.map((user) => ({
          ...user,
          "company.name": user.company.name,
        }));
        this.paginationConfig.total = this.allUsers.length;
        this.updateTableData();
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  onTableEvents(event: any): void {
    if (event.event === "row_click") {
      this.goToDetails(event.row);
    }

    if (event.event === "change_page") {
      this.tableConfig = {
        ...this.tableConfig,
        pagination: {
          ...this.tableConfig.pagination,
          page_number: event.page_event.actual,
        },
      };
      this.updateTableData();
    }
  }

  updateTableData() {
    const startIndex =
      (this.paginationConfig.page - 1) * this.paginationConfig.itemsPerPage;
    const endIndex = startIndex + this.paginationConfig.itemsPerPage;

    this.tableConfig = {
      ...this.tableConfig,
      data: this.allUsers.slice(startIndex, endIndex),
      loading: false,
    };
  }

  onPaginationEvents(event: any): void {
    const newPage = event.actual || event.page;

    if (newPage && newPage !== this.paginationConfig.page) {
      this.paginationConfig.page = newPage;
      this.updateTableData();
    }
  }

  goToDetails(user: UserTableRow) {
    this.router.navigate(["/users", user.id]);
  }

  editUser(user: UserTableRow) {
    this.modalService
      .open(UserModalComponent, {
        title: `Editar usuário: ${user.name}`,
        width: 640,
        ionParams: { user },
        footer: {
          hide: true,
        },
      })
      .subscribe({
        next: (response: any) => {
          if (response && response.editedUser) {
            const editedUser = response.editedUser as User;
            const index = this.allUsers.findIndex(
              (u) => u.id === editedUser.id,
            );
            if (index >= 0) {
              this.allUsers[index] = {
                ...editedUser,
                "company.name":
                  editedUser.company && editedUser.company.name
                    ? editedUser.company.name
                    : "",
              };
            }
            this.updateTableData();
            this.notificationService.success(
              "Usuário editado",
              "Os dados do usuário foram atualizados com sucesso.",
            );
          }
        },
        error: () => {
          this.notificationService.error(
            "Erro",
            "Não foi possível abrir o modal de edição.",
          );
        },
      });
  }

  deleteUser(user: UserTableRow) {
    this.allUsers = this.allUsers.filter((u) => u.id !== user.id);
    this.paginationConfig.total = this.allUsers.length;

    const maxPages = Math.ceil(
      this.paginationConfig.total / this.paginationConfig.itemsPerPage,
    );
    if (this.paginationConfig.page > maxPages && maxPages > 0) {
      this.paginationConfig.page = maxPages;
    }

    this.updateTableData();
  }
}
