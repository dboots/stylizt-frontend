import { Component, computed, input, output, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from "@angular/common/http";
import { Observable, lastValueFrom } from "rxjs";
import { map, tap } from "rxjs/operators";

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  // Add other response fields as needed
}

interface UploadProgress {
  filename: string;
  progress: number;
}

@Component({
  selector: "app-cloudinary-uploader",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="col-12 drag-drop p-2"
      (click)="fileInput.click()"
      (dragover)="onDragOver($event)"
      (drop)="onDrop($event)"
    >
      <div class="row">
        <div class="col-12">
          <div class="text-center">
            Upload Image
            <i class="ms-2 fas fa-icon fa-upload"></i>
          </div>
          @if (uploadProgress().length > 0) { @for (progress of
          uploadProgress(); track progress.filename) {
          <div class="pt-2">
            Uploading {{ progress.filename }}... {{ progress.progress }}%
          </div>
          } }
        </div>
      </div>
      <span class="upload">
        <input
          #fileInput
          type="file"
          [attr.multiple]="allowMultiple()"
          (change)="onFileSelected($event)"
          accept="image/jpg,image/jpeg,image/png,image/gif"
        />
      </span>
    </div>
  `,
  styles: [
    `
      .drag-drop {
        border: 1px dashed #5ab7bb;
        height: 75px;
        border-radius: 4px;
        background: rgba(90, 183, 187, 0.1);
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        cursor: pointer;
      }

      span.upload {
        visibility: hidden;
        position: absolute;
        overflow: hidden;
        width: 0;
        height: 0;
        border: 0;
        margin: 0;
        padding: 0;
      }

      .upload input {
        display: none;
      }

      .drag-over {
        border-color: #2196f3;
        background-color: #e3f2fd;
      }
    `,
  ],
})
export class CloudinaryUploaderComponent {
  // Inputs
  folderName = input<string>("");
  buttonName = input<string>("Upload Image");
  allowMultiple = input<boolean>(false);
  showStatus = input<boolean>(true);

  // Outputs
  completeItem = output<CloudinaryResponse>();
  uploadComplete = output<void>();
  fileProgress = output<UploadProgress>();
  uploadError = output<Error>();
  uploadStart = output<void>();

  // Internal state
  private readonly CLOUD_NAME = "drcvakvh3";
  private readonly UPLOAD_PRESET = "k9kduvri";
  private readonly CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/upload`;

  uploadProgress = signal<UploadProgress[]>([]);
  isUploading = signal(false);

  constructor(private http: HttpClient) {}

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.uploadStart.emit();
    this.isUploading.set(true);

    try {
      const files = Array.from(input.files);
      const uploadPromises = files.map((file) => this.uploadFile(file));
      await Promise.all(uploadPromises);

      this.uploadComplete.emit();
    } catch (error) {
      this.uploadError.emit(error as Error);
    } finally {
      this.isUploading.set(false);
      this.uploadProgress.set([]);
    }
  }

  private async uploadFile(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", this.UPLOAD_PRESET);
    formData.append("folder", this.folderName());

    const headers = new HttpHeaders().set("X-Requested-With", "XMLHttpRequest");

    try {
      const upload$ = this.http.post<CloudinaryResponse>(
        this.CLOUDINARY_URL,
        formData,
        {
          headers,
          reportProgress: true,
          observe: "events",
        }
      );

      const response = await lastValueFrom(
        new Observable<CloudinaryResponse>((subscriber) => {
          upload$.subscribe({
            next: (event: HttpEvent<CloudinaryResponse>) => {
              if (event.type === HttpEventType.UploadProgress && event.total) {
                const progress = Math.round((100 * event.loaded) / event.total);
                this.updateProgress(file.name, progress);
              }
              if (event.type === HttpEventType.Response && event.body) {
                subscriber.next(event.body);
                subscriber.complete();
              }
            },
            error: (error) => subscriber.error(error),
            complete: () => subscriber.complete(),
          });
        })
      );

      if (response) {
        this.completeItem.emit(response);
      }
    } catch (error) {
      this.uploadError.emit(error as Error);
      throw error;
    }
  }

  private updateProgress(filename: string, progress: number) {
    const currentProgress = this.uploadProgress();
    const fileIndex = currentProgress.findIndex((p) => p.filename === filename);

    if (fileIndex === -1) {
      this.uploadProgress.set([...currentProgress, { filename, progress }]);
    } else {
      const updatedProgress = [...currentProgress];
      updatedProgress[fileIndex] = { filename, progress };
      this.uploadProgress.set(updatedProgress);
    }

    this.fileProgress.emit({ filename, progress });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.add("drag-over");
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files?.length) {
      const input = document.createElement("input");
      input.type = "file";
      input.multiple = this.allowMultiple();
      input.files = files;

      const changeEvent = new Event("change");
      Object.defineProperty(changeEvent, "target", { value: input });
      this.onFileSelected(changeEvent);
    }

    (event.target as HTMLElement).classList.remove("drag-over");
  }
}
