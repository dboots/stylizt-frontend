import {
  Component,
  OnInit,
  HostListener,
  Input,
  inject,
  TemplateRef,
} from "@angular/core";
import { Observable, Subscription, throwError } from "rxjs";
import { catchError, filter, map } from "rxjs/operators";
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  RouterLink,
} from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService, UserService } from "../../../services";
import { User } from "../../../models";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
  imports: [CommonModule, RouterLink, FormsModule],
  standalone: true,
})
export class NavComponent implements OnInit {
  @Input() dark: boolean = false;
  private routerSubscription?: Subscription;

  model: User = new User();
  private modalService = inject(NgbModal);
  message: string = "";
  forgotPassword: boolean = false;
  isFullNav: boolean = true;
  navItems = [
    { name: "Contact", url: "/contact", scroll: false },
    { name: "Login" },
  ];
  loggedInUser: User;
  newInnerWidth;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // this.newInnerWidth = window.innerWidth;
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;
  }

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        map(() => this.extractNavItems(this.activatedRoute.firstChild))
      )
      .subscribe((navItems) => {
        if (navItems) {
          this.navItems = navItems;
        }
      });
    this.loggedInUser = this.authService.isAuthenticated()
      ? this.authService.decode()
      : null;
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }

  private extractNavItems(route: ActivatedRoute | null): any[] | null {
    while (route) {
      if (route.firstChild) {
        route = route.firstChild;
      } else if (route.snapshot.data && "navItems" in route.snapshot.data) {
        return route.snapshot.data["navItems"];
      } else {
        return null;
      }
    }
    return null;
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  signup() {
    this.modalService.dismissAll();
    this.router.navigate(["landing"]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          console.log("result", result);
        },
        (reason) => {
          console.log("reason", reason);
        }
      );
  }

  doResetPassword() {
    if (this.model.email.length > 0) {
      this.userService.forgotPassword(this.model).subscribe(
        (result) => {
          this.message =
            "An email has been sent requesting to reset your password";
        },
        (err) => {
          this.message = "Unable to process that request";
        }
      );
    }
  }

  doLogin() {
    this.userService
      .login(this.model)
      .pipe(
        catchError((error) => {
          this.message = "Invalid login, please try again.";
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (data) => {
          this.message = "";
          this.modalService.dismissAll();
          console.log("doLogin setting token", data["token"]);
          this.authService.token = data["token"];
          this.userService.headers = AuthService.httpOptions(
            this.authService.token
          );
          this.router.navigate(["stylist/profile/edit"]);
        },
        error: (error) => {
          this.message = "Invalid login, please try again.";
        },
      });

    // this.userService.login(this.model).subscribe(
    //   (data) => {
    //     this.message = "";
    //     this.modalService.dismissAll();
    //     console.log("doLogin setting token", data["token"]);
    //     this.authService.token = data["token"];
    //     this.userService.headers = AuthService.httpOptions(
    //       this.authService.token
    //     );
    //     this.router.navigate(["stylist/profile/edit"]);
    //   },
    //     (error) => {
    //       this.message = "Invalid login, please try again.";
    //       return Observable.throw(error);
    //     }
    // );
  }

  navigateTo(linkTo) {
    this.router.navigate([linkTo]);
  }
}
