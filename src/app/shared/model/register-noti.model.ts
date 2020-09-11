export class RegisterNoti {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public role: string,
    public tel: string,
    public activated: boolean,
    public admin_confirmation: boolean
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.tel = tel;
    this.activated = activated;
    this.admin_confirmation = admin_confirmation;
  }
}
