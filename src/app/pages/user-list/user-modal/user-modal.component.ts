import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonModalService } from "@brisanet/ion";
import { User } from "../../../models/user.model";

@Component({
  selector: "app-user-modal",
  templateUrl: `./user-modal.component.html`,
  styleUrls: ["./user-modal.component.css"],
})
export class UserModalComponent implements OnInit {
  @Input() user: User | undefined;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: IonModalService,
  ) {}

  ngOnInit() {
    const u = this.user;

    this.form = this.fb.group({
      name: [u ? u.name : "", Validators.required],
      email: [u ? u.email : "", [Validators.required, Validators.email]],
      companyName: [
        u && u.company && u.company.name ? u.company.name : "",
        Validators.required,
      ],
      phone: [u ? u.phone : ""],
      website: [u ? u.website : ""],
    });
  }

  get name() {
    return this.form.get("name");
  }

  get email() {
    return this.form.get("email");
  }

  get companyName() {
    return this.form.get("companyName");
  }

  get phone() {
    return this.form.get("phone");
  }

  get website() {
    return this.form.get("website");
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValues = this.form.value;

    const editedUser: User = {
      id: this.user ? this.user.id : 0,
      name: formValues.name,
      email: formValues.email,
      phone: formValues.phone,
      website: formValues.website,
      address: this.user ? this.user.address : undefined,
      company: {
        name: formValues.companyName,
      },
    };

    this.modalService.emitValueAndCloseModal({ editedUser });
  }

  cancel() {
    this.modalService.closeModal();
  }
}
