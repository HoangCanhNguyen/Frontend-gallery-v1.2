export class RegisterNoti {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public role: string,
    public status: string,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.status = status;
  }
}
