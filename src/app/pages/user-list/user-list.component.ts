import { Component, OnInit } from "@angular/core";
import { UserService, User } from "../../services/user.service";
import { Router } from "@angular/router";
import { IonModalService, IonNotificationService } from "@brisanet/ion";
import { UserModalComponent } from "./user-modal/user-modal.component";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  allUsers: any[] = []; // Guarda todos os usuários da API
  loading = true;
  error = false;

  // Controle de paginação isolado (separado da tabela)
  paginationConfig = {
    total: 0,
    itemsPerPage: 5, // Mudado para 5 para conseguirmos ver a paginação funcionando com os 10 usuários da API
    page: 1,
  };

  tableConfig: any = {
    data: [], // Os dados que realmente aparecem na tela (fatiados)
    loading: true,
    columns: [
      {
        key: "name",
        label: "Nome",
        sort: true,
        type: "link",
        link: {
          label: (row: any) => row.name,
          action: (row: any) => this.viewDetails(row)
        },
      },
      { key: "email", label: "E-mail", sort: true },
      { key: "company.name", label: "Empresa", sort: false },
    ],
    actions: [
      {
        label: "Editar",
        icon: "pencil",
        call: (row: User) => this.viewDetails(row),
        tooltip: "Visualizar detalhes do usuário",
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
        call: (row: User) => this.deleteUser(row),
      },
    ],
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: IonModalService,
    private notificationService: IonNotificationService
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.error = false;
    this.loading = true;

    this.userService.getUsers().subscribe({
      next: (data) => {
        // Salva os dados processados na variável original
        this.allUsers = data.map((user) => ({
          ...user,
          "company.name": user.company.name,
        }));

        // Atualiza o total da paginação
        this.paginationConfig.total = this.allUsers.length;

        // Renderiza a primeira página
        this.updateTableData();

        this.loading = false;
      },
      error: (err) => {
        console.error("Erro ao carregar usuários:", err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  onTableEvents(event: any): void {
    console.log("Evento da tabela:", event);
    if (event.event === "row_click") {
      this.viewDetails(event.row);
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

  // Função responsável por fatiar os dados baseados na página atual
  updateTableData() {
    const startIndex =
      (this.paginationConfig.page - 1) * this.paginationConfig.itemsPerPage;
    const endIndex = startIndex + this.paginationConfig.itemsPerPage;

    // Atualiza apenas os dados visíveis na tabela com base na página
    this.tableConfig = {
      ...this.tableConfig,
      data: this.allUsers.slice(startIndex, endIndex),
      loading: false,
    };
  }

  // Evento disparado pelo <ion-pagination>
  onPaginationEvents(event: any): void {
    // O evento da paginação isolada costuma devolver o objeto direto com { actual, itemsPerPage, offset }
    const newPage = event.actual || event.page;

    if (newPage && newPage !== this.paginationConfig.page) {
      this.paginationConfig.page = newPage;
      this.updateTableData();
    }
  }

  viewDetails(user: any) {
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
            const index = this.allUsers.findIndex((u) => u.id === editedUser.id);
            if (index >= 0) {
              this.allUsers[index] = {
                ...editedUser,
                "company.name": editedUser.company && editedUser.company.name ? editedUser.company.name : "",
              };
            }
            this.updateTableData();
            this.notificationService.success(
              "Usuário editado",
              "Os dados do usuário foram atualizados com sucesso."
            );
          }
        },
        error: (err) => {
          console.error("Erro ao abrir modal de edição:", err);
        },
      });
  }

  deleteUser(user: any) {
    // Deleta do array original
    this.allUsers = this.allUsers.filter((u: any) => u.id !== user.id);
    this.paginationConfig.total = this.allUsers.length;

    // Boa prática: Se o usuário deletar o último item da página atual, voltamos uma página
    const maxPages = Math.ceil(
      this.paginationConfig.total / this.paginationConfig.itemsPerPage,
    );
    if (this.paginationConfig.page > maxPages && maxPages > 0) {
      this.paginationConfig.page = maxPages;
    }

    // Re-renderiza a tabela
    this.updateTableData();
  }
}
