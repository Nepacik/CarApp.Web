export class UserInfo {

  constructor(private role:string, private isloggedIn:boolean) {

  }

  getRole() :string {
    return this.role;
  }

  isLogged() :boolean {
    return this.isloggedIn;
  }
}
