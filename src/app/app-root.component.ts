import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.css'],
})
export class AppRootComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  plyFilePath: File;

  fileBrowseHandler($event): void {
    console.log('HERE EVENT', $event);
    this.plyFilePath = $event.target.files[0];
  }

  onFileDropped(asd): void {}
}
