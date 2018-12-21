export class User {

  constructor(
    public _id: string = '',
    public firstName: string = '',
    public surname: string = '',
    public password: string = '',
    public phone: string = '',
    public email: string = '',
    public adress: string = '',
    public roles: string[] = []
  ) {
  }

}
