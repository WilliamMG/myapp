import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import {ChangeDetectorRef} from "@angular/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  matches = [];
  isRecording = false;
  constructor(public navCtrl: NavController, private plt:Platform, private speechRecognition: SpeechRecognition, private cd:ChangeDetectorRef) {

  }

  getPermissions(){
    this.speechRecognition.hasPermission()
    .then((hasPermission:boolean)=>{
      if (hasPermission) {
        this.speechRecognition.requestPermission();
      }
    });
  }
  startListening(){
    let options ={
      language: 'en-US'
    };
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }
  stopListening(){
    this.speechRecognition.stopListening().then(()=>{
      this.isRecording = false;
    });
  }

  isIos(){
    return this.plt.is('ios');
  }

}
