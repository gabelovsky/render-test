import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { Vector3 } from 'three';
import * as THREE from 'three-full';
import clusters from '../../assets/input-segmentation-clusters.json';

@Component({
  selector: 'app-display-canvas',
  templateUrl: './display-canvas.component.html',
  styleUrls: ['./display-canvas.component.css'],
})
export class DisplayCanvasComponent implements OnInit, AfterViewInit {
  constructor() {}

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: THREE.OrbitControls;

  clusterMaterials: THREE.PointsMaterial[] = [
    new THREE.PointsMaterial({
      size: 0.01,
      color: 0x00ff00,
    }),
    new THREE.PointsMaterial({
      size: 0.01,
      color: 0xffff00,
    }),
    new THREE.PointsMaterial({
      size: 0.01,
      color: 0xff0000,
    }),
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    this.setupScene();
    this.loadPLYFile();
    this.render();
  }

  loadPLYFile() {
    const loader = new THREE.PLYLoader();

    loader.load('../../assets/input-cloud-ascii.ply', (geometry) => {
      geometry.center();

      let vectorArrays: Vector3[][] = [];

      clusters.clustersIndices.forEach((cluster, clusterIndex) => {
        vectorArrays.push([]);
        cluster.forEach((pointIndex) => {
          let point = new THREE.Vector3().fromBufferAttribute(
            geometry.attributes.position,
            pointIndex
          );
          vectorArrays[clusterIndex].push(point);
        });
      });

      const group = new THREE.Group();

      vectorArrays.forEach((vectorArray, vectorIndex) => {
        group.add(
          new THREE.Points(
            new THREE.BufferGeometry().setFromPoints(vectorArray),
            this.clusterMaterials[vectorIndex]
          )
        );
      });

      group.rotation.x = Math.PI / 2;

      this.scene.add(group);
    });
  }

  setupScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
    this.camera = new THREE.PerspectiveCamera(
      30,
      this.canvasRef.nativeElement.clientWidth /
        this.canvasRef.nativeElement.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = -1;
    this.camera.position.y = 1;
    this.camera.position.x = 1;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
    });
    this.renderer.setSize(
      this.canvasRef.nativeElement.clientWidth,
      this.canvasRef.nativeElement.clientHeight
    );

    this.controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    );
  }

  render() {
    requestAnimationFrame(this.render.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
