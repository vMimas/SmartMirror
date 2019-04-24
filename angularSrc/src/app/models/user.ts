export class User {
  id:string;
  email:string;
  username:string;
  password:string;
  message:string;
  displayWeather:boolean;
  displayNews:boolean;
}
/** EXAMPLE CODE FOR IMPLEMENTATION
  user : User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }
**/
