import { Component, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

declare var Peer: any;

@Component({
  selector: 'app-landing-video',
  templateUrl: './video.component.html'
})
export class LandingVideoPageComponent implements OnInit {
  @ViewChild('myvideo', { static: true }) myVideo: any;

  peer;
  anotherid;
  mypeerid;

  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute
  ) {
    this.updateMeta();
  }

  ngOnInit() {
    const video = this.myVideo.nativeElement;
    this.peer = new Peer({key: 'lwjd5qra8257b9'});
    setTimeout(() => {
      this.mypeerid = this.peer.id;
    }, 3000);

    this.peer.on('connection', function(conn) {
      conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
      });
    });
    this.peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        // Will print 'hi!'
        console.log(data);
      });
    });

    const n = navigator as any;

    n.getUserMedia =  ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia );

    this.peer.on('call', (call) => {
      n.getUserMedia({video: true, audio: true}, (stream) => {
        call.answer(stream);
        call.on('stream', (remotestream) => {
          video.src = URL.createObjectURL(remotestream);
          video.play();
        });
      }, (err) => {
        console.log('Failed to get stream', err);
      });
    });
  }

  updateMeta() {
    this.title.setTitle('Hair to Chair - Personal Stylists, Video Consultations');

    this.meta.updateTag({
      name: 'description',
      content: 'Live 1 on 1 video chat and consultations with you personal stylist specializing in haircuts, perms, bangs.'
    });

    console.log('PRErender ready status...');
  }

  connect() {
    const conn = this.peer.connect(this.anotherid);
    conn.on('open', () => {
      conn.send('Message from that id');
    });
  }

  videoconnect() {
    const video = this.myVideo.nativeElement;
    const localvar = this.peer;
    const fname = this.anotherid;

    const n = navigator as any;

    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );

    n.getUserMedia({video: true, audio: true}, (stream) => {
      const call = localvar.call(fname, stream);
      call.on('stream', (remotestream) => {
        video.src = URL.createObjectURL(remotestream);
        video.play();
      });
    }, (err) => {
      console.log('Failed to get stream', err);
    });
  }
}
