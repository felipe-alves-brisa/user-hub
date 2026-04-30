import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  form: FormGroup;

  showMessage = false;
  messageConfig = {
    type: "success",
    content: "",
  };

  companyOptions: Array<{ label: string; value: string; selected: boolean }> = [
    { label: "Empresa A", value: "empresa_a", selected: false },
    { label: "Empresa B", value: "empresa_b", selected: false },
    { label: "Outra", value: "outra", selected: false },
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      company: ["", Validators.required],
      sendInvite: [false],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.messageConfig = {
        type: "warning",
        content: "Preencha os campos obrigatórios corretamente.",
      };
      this.showMessage = true;
      return;
    }

    this.messageConfig = {
      type: "success",
      content: "Usuário salvo com sucesso!",
    };
    this.showMessage = true;

    setTimeout(() => {
      this.router.navigate(["/users"]);
    }, 2000);
  }

  goBack() {
    this.router.navigate(["/users"]);
  }

  onCompanySelected(selectedOptions: any) {
    const selectedOption =
      Array.isArray(selectedOptions) && selectedOptions.length > 0
        ? selectedOptions[0]
        : null;

    this.companyOptions = this.companyOptions.map((option) => ({
      ...option,
      selected: !!selectedOption && option.value === selectedOption.value,
    }));

    this.form
      .get("company")!
      .setValue(selectedOption ? selectedOption.value : "");
  }

  toggleSendInvite() {
    const sendInviteControl = this.form.get("sendInvite");
    sendInviteControl!.setValue(!sendInviteControl!.value);
  }
}
