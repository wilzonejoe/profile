import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'profile';
  ngOnInit(): void {
    this.unsupportedBrowserHandler();
    this.startMenuToggleHander();
  }

  private unsupportedBrowserHandler(): void {
    if (!/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
      return;
    }

    const edgeSiteLocation = new Location();
    edgeSiteLocation.href = 'microsoft-edge:' + window.location;
    window.location = edgeSiteLocation;

    setTimeout(() => {
      const unsupportedSiteLocation = new Location();
      unsupportedSiteLocation.href = 'https://go.microsoft.com/fwlink/?linkid=2135547';
      window.location = unsupportedSiteLocation;
    }, 1);
  }

  private startMenuToggleHander(): void {
    $('#menu-toggle').on('click', (e) => {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
  }
}
