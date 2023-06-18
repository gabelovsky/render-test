import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.css'],
})
export class AppRootComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  plyFilePath: string = '../../assets/input-cloud-ascii.ply';

  getPLYFiles(): void {
    //TODO handle getting path for different model files and change plyFilePath
    this.httpClient.get('assets/*').subscribe((fileList) => {});
  }
}
