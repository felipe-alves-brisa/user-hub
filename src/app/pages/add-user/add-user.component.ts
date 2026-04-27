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

  companyOptions = [
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

  ngOnInit() {
    console.log(this.form);
  }

  onSubmit() {
    this.form.get("name")!.markAsTouched();
    this.form.get("email")!.markAsTouched();
    this.form.get("company")!.markAsTouched();

    if (this.form.invalid) {
      this.messageConfig = {
        type: "warning",
        content: "Preencha os campos obrigatórios corretamente.",
      };
      this.showMessage = true;
      return;
    }

    // Simulate save
    console.log("Dados do formulário:", this.form.value);
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
      selectedOptions && selectedOptions.length > 0 ? selectedOptions[0] : null;
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
