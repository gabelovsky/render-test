import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRootComponent } from './app-root.component';
import { BrowserModule } from '@angular/platform-browser';
import { DisplayCanvasComponent } from './display-canvas/display-canvas.component';

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [AppRootComponent, DisplayCanvasComponent],
  bootstrap: [AppRootComponent],
})
export class AppModule {}
