import { Component, OnInit } from "@angular/core";
import { SignupComponent } from "../shared/signup/signup.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./stylist.component.html",
  styleUrls: ["./stylist.component.scss"],
  imports: [RouterOutlet, SignupComponent],
  standalone: true,
})
export class StylistPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
