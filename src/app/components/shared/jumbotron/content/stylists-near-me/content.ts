import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-stylists-near-me-content",
  templateUrl: "./content.html",
  styleUrls: ["./content.scss"],
})
export class StylistsNearMeContentComponent implements OnInit {
  state: string;
  city: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.params.subscribe((params) => {
      const state = String(params.state);
      const city = String(params.city);

      this.city = city.charAt(0).toUpperCase() + city.slice(1);
      this.state = state.charAt(0).toUpperCase() + state.slice(1);
    });
  }
}
