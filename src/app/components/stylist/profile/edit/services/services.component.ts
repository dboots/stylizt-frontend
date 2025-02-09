import { Component, OnInit } from "@angular/core";
import { Service, User } from "src/app/models";
import { ServicesService } from "src/app/services";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-profile-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class EditProfileServicesComponent implements OnInit {
  services: Service[] = [];
  user: User;
  message: string = " ";
  showMessage: boolean = false;

  constructor(private servicesService: ServicesService) {}

  ngOnInit() {
    this.servicesService.read(this.user._id).subscribe((result) => {
      this.services = result;
    });
  }

  add() {
    this.services.unshift(new Service());
  }

  save(service: Service, index: number) {
    if (service._id) {
      this.servicesService.update(service).subscribe((result) => {
        this.services[index] = result;
        this.startMessageTimer("Service Updated!");
      });
    } else {
      this.servicesService.create(service).subscribe((result) => {
        console.log("result", result);
        this.services[index] = result;
        this.startMessageTimer("Service Created!");
      });
    }
  }

  delete(service: Service) {
    this.servicesService.delete(service).subscribe((result) => {
      this.startMessageTimer("Service Deleted!");
      const index = this.services.findIndex((s) => s._id === service._id);
      this.services.splice(index, 1);
    });
  }

  startMessageTimer(message: string) {
    this.message = message;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }
}
