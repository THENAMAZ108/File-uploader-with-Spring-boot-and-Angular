import { Component, ViewChild, ElementRef } from '@angular/core';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  @ViewChild('fileInput') fileInput: ElementRef;
  selectedFile: File;
  uploadProgress: number;
  errorMessage: string;
  message: string;

  constructor(private fileUploadService: FileService) { }

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      if (file.size > 15 * 1024 * 1024) { // 15MB in bytes
        this.errorMessage = 'Файл слишком большой. Максимальный размер файла - 15Мб.';
        this.message = '';
        this.selectedFile = null;
        this.fileInput.nativeElement.value = '';
      } else {
        this.selectedFile = file;
        this.errorMessage = '';
        this.message = '';
      }
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile)
        .subscribe(
          progress => {
          this.uploadProgress = progress;
          if (progress === 100) {
            this.message = 'Файл успешно загружен.';
            this.selectedFile = null;
          }
        });
    }
  }

  cancelFile(): void {
    if (this.selectedFile) {
      this.message = 'Загрузка файла отменена.';
    }
    this.selectedFile = null;
    this.fileInput.nativeElement.value = '';
  }
}
