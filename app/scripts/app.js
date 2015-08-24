/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
    app.maxDia = document.querySelectorAll('neon-animatable').length - 1;
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  app.selected = ( window.history.state ) ? window.history.state : 0;

  app._onPrevClick = function() {
    this.entryAnimation = '';
    this.exitAnimation = 'slide-right-animation';
    this.selected = this.selected === 0 ? app.maxDia : (this.selected - 1);
    window.history.replaceState( this.selected, '', '#' + this.selected );
  };

  app._onNextClick = function() {
    var current = app.$.pages.selectedItem;

    console.dir(current);

    current.dataset.entry = ( current.dataset.entry ) ? current.dataset.entry : 'slide-from-right-animation';
    current.dataset.exit = ( current.dataset.exit ) ? current.dataset.exit : '';
    this.entryAnimation = current.dataset.entry;
    this.exitAnimation = current.dataset.exit;

    this.selected = this.selected === app.maxDia ? 0 : (this.selected + 1);
    window.history.replaceState( this.selected, '', '#' + this.selected );

    if (current.querySelector('.content').desactivateDia) {
      current.querySelector('.content').desactivateDia();
    }

    if (current.nextElementSibling.querySelector('.content').activateDia) {
      current.nextElementSibling.querySelector('.content').activateDia();
    }
  };

  app.changePage = function ( e ) {
    if ( e.detail.state === 'end' ) {
      if ( e.detail.dx < 0 ) {
        app._onNextClick();
      } else {
        app._onPrevClick();
      }
    }
  };

  document.addEventListener('keydown', function( e ) {
    switch ( e.keyCode ) {
      case 37:
        app._onPrevClick();
        break;
      case 32:
      case 39:
        app._onNextClick();
        break;
      default:
    }
  });

  document.addEventListener('click', function() {
    app._onNextClick();
  });

  app.setLogoHeight = function ( el, coef ) {
    coef = (coef) ? coef : 0.4;
    var value = window.innerHeight * coef;
    el.style.height = value + 'px';
  };

})(document);
