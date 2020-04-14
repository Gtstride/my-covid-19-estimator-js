/* eslint-disable prefer-rest-params */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-var */
/* eslint-disable no-self-assign */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/*!
 * animsition v4.0.2
 * A simple and easy jQuery plugin for CSS animated page transitions.
 * http://blivesta.github.io/animsition
 * License : MIT
 * Author : blivesta (http://blivesta.com/)
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(($) => {
  const namespace = 'animsition';
  var __ = {
    init(options) {
      options = $.extend({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        // e.g. linkElement   :   'a:not([target="_blank"]):not([href^="#"])'
        loading: true,
        loadingParentElement: 'body', // animsition wrapper element
        loadingClass: 'animsition-loading',
        loadingInner: '', // e.g '<img src="loading.svg" />'
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ['animation-duration', '-webkit-animation-duration'],
        // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'body',
        transition(url) { window.location.href = url; }
      }, options);

      __.settings = {
        timer: false,
        data: {
          inClass: 'animsition-in-class',
          inDuration: 'animsition-in-duration',
          outClass: 'animsition-out-class',
          outDuration: 'animsition-out-duration',
          overlay: 'animsition-overlay'
        },
        events: {
          inStart: 'animsition.inStart',
          inEnd: 'animsition.inEnd',
          outStart: 'animsition.outStart',
          outEnd: 'animsition.outEnd'
        }
      };

      // Remove the "Animsition" in a browser
      // that does not support the "animaition-duration".
      const support = __.supportCheck.call(this, options);

      if (!support && options.browser.length > 0) {
        if (!support || !this.length) {
          // If do not have a console object to object window
          if (!('console' in window)) {
            window.console = {};
            window.console.log = function (str) { return str; };
          }
          if (!this.length) console.log('Animsition: Element does not exist on page.');
          if (!support) console.log('Animsition: Does not support this browser.');
          return __.destroy.call(this);
        }
      }

      const overlayMode = __.optionCheck.call(this, options);

      if (overlayMode && $(`.${options.overlayClass}`).length <= 0) {
        __.addOverlay.call(this, options);
      }

      if (options.loading && $(`.${options.loadingClass}`).length <= 0) {
        __.addLoading.call(this, options);
      }

      return this.each(function () {
        const _this = this;
        const $this = $(this);
        const $window = $(window);
        const $document = $(document);
        const data = $this.data(namespace);

        if (!data) {
          options = $.extend({}, options);

          $this.data(namespace, { options });

          if (options.timeout) __.addTimer.call(_this);

          if (options.onLoadEvent) {
            $window.on(`load.${namespace}`, () => {
              if (__.settings.timer) clearTimeout(__.settings.timer);
              __.in.call(_this);
            });
          }

          $window.on(`pageshow.${namespace}`, (event) => {
            if (event.originalEvent.persisted) __.in.call(_this);
          });

          // Firefox back button issue #4
          $window.on(`unload.${namespace}`, () => { });

          $document.on(`click.${namespace}`, options.linkElement, function (event) {
            event.preventDefault();
            const $self = $(this);
            const url = $self.attr('href');

            // middle mouse button issue #24
            // if(middle mouse button || command key || shift key || win control key)
            if (event.which === 2 || event.metaKey || event.shiftKey || navigator.platform.toUpperCase().indexOf('WIN') !== -1 && event.ctrlKey) {
              window.open(url, '_blank');
            } else {
              __.out.call(_this, $self, url);
            }
          });
        }
      }); // end each
    },

    addOverlay(options) {
      $(options.overlayParentElement)
        .prepend(`<div class="${options.overlayClass}"></div>`);
    },

    addLoading(options) {
      $(options.loadingParentElement)
        .append(`<div class="${options.loadingClass}">${options.loadingInner}</div>`);
    },

    removeLoading() {
      const $this = $(this);
      const { options } = $this.data(namespace);
      const $loading = $(options.loadingParentElement).children(`.${options.loadingClass}`);

      $loading.fadeOut().remove();
    },

    addTimer() {
      const _this = this;
      const $this = $(this);
      const { options } = $this.data(namespace);

      __.settings.timer = setTimeout(() => {
        __.in.call(_this);
        $(window).off(`load.${namespace}`);
      }, options.timeoutCountdown);
    },

    supportCheck(options) {
      const $this = $(this);
      const props = options.browser;
      const propsNum = props.length;
      let support = false;

      if (propsNum === 0) {
        support = true;
      }
      for (let i = 0; i < propsNum; i++) {
        if (typeof $this.css(props[i]) === 'string') {
          support = true;
          break;
        }
      }
      return support;
    },

    optionCheck(options) {
      const $this = $(this);
      let overlayMode;
      if (options.overlay || $this.data(__.settings.data.overlay)) {
        overlayMode = true;
      } else {
        overlayMode = false;
      }
      return overlayMode;
    },

    animationCheck(data, stateClass, stateIn) {
      const $this = $(this);
      const { options } = $this.data(namespace);
      const dataType = typeof data;
      const dataDuration = !stateClass && dataType === 'number';
      const dataClass = stateClass && dataType === 'string' && data.length > 0;

      if (dataDuration || dataClass) {
        data = data;
      } else if (stateClass && stateIn) {
        data = options.inClass;
      } else if (!stateClass && stateIn) {
        data = options.inDuration;
      } else if (stateClass && !stateIn) {
        data = options.outClass;
      } else if (!stateClass && !stateIn) {
        data = options.outDuration;
      }
      return data;
    },

    in() {
      const _this = this;
      const $this = $(this);
      const { options } = $this.data(namespace);
      const thisInDuration = $this.data(__.settings.data.inDuration);
      const thisInClass = $this.data(__.settings.data.inClass);
      const inDuration = __.animationCheck.call(_this, thisInDuration, false, true);
      const inClass = __.animationCheck.call(_this, thisInClass, true, true);
      const overlayMode = __.optionCheck.call(_this, options);
      const { outClass } = $this.data(namespace);

      if (options.loading) __.removeLoading.call(_this);

      if (outClass) $this.removeClass(outClass);

      if (overlayMode) {
        __.inOverlay.call(_this, inClass, inDuration);
      } else {
        __.inDefault.call(_this, inClass, inDuration);
      }
    },

    inDefault(inClass, inDuration) {
      const $this = $(this);

      $this
        .css({ 'animation-duration': `${inDuration}ms` })
        .addClass(inClass)
        .trigger(__.settings.events.inStart)
        .animateCallback(() => {
          $this
            .removeClass(inClass)
            .css({ opacity: 1 })
            .trigger(__.settings.events.inEnd);
        });
    },

    inOverlay(inClass, inDuration) {
      const $this = $(this);
      const { options } = $this.data(namespace);

      $this
        .css({ opacity: 1 })
        .trigger(__.settings.events.inStart);

      $(options.overlayParentElement)
        .children(`.${options.overlayClass}`)
        .css({ 'animation-duration': `${inDuration}ms` })
        .addClass(inClass)
        .animateCallback(() => {
          $this
            .trigger(__.settings.events.inEnd);
        });
    },

    out($self, url) {
      const _this = this;
      const $this = $(this);
      const { options } = $this.data(namespace);
      const selfOutClass = $self.data(__.settings.data.outClass);
      const thisOutClass = $this.data(__.settings.data.outClass);
      const selfOutDuration = $self.data(__.settings.data.outDuration);
      const thisOutDuration = $this.data(__.settings.data.outDuration);
      const isOutClass = selfOutClass || thisOutClass;
      const isOutDuration = selfOutDuration || thisOutDuration;
      const outClass = __.animationCheck.call(_this, isOutClass, true, false);
      const outDuration = __.animationCheck.call(_this, isOutDuration, false, false);
      const overlayMode = __.optionCheck.call(_this, options);

      $this.data(namespace).outClass = outClass;

      if (overlayMode) {
        __.outOverlay.call(_this, outClass, outDuration, url);
      } else {
        __.outDefault.call(_this, outClass, outDuration, url);
      }
    },

    outDefault(outClass, outDuration, url) {
      const $this = $(this);
      const { options } = $this.data(namespace);

      // (outDuration + 1) | #55 outDuration: 0 crashes on Safari only
      $this
        .css({ 'animation-duration': `${outDuration + 1}ms` })
        .addClass(outClass)
        .trigger(__.settings.events.outStart)
        .animateCallback(() => {
          $this.trigger(__.settings.events.outEnd);
          options.transition(url);
        });
    },


    outOverlay(outClass, outDuration, url) {
      const _this = this;
      const $this = $(this);
      const { options } = $this.data(namespace);
      const thisInClass = $this.data(__.settings.data.inClass);
      const inClass = __.animationCheck.call(_this, thisInClass, true, true);

      // (outDuration + 1) | #55 outDuration: 0 crashes animsition on Safari only
      $(options.overlayParentElement)
        .children(`.${options.overlayClass}`)
        .css({ 'animation-duration': `${outDuration + 1}ms` })
        .removeClass(inClass)
        .addClass(outClass)
        .trigger(__.settings.events.outStart)
        .animateCallback(() => {
          $this.trigger(__.settings.events.outEnd);
          options.transition(url);
        });
    },

    destroy() {
      return this.each(function () {
        const $this = $(this);
        $(window).off(`.${namespace}`);
        $this
          .css({ opacity: 1 })
          .removeData(namespace);
      });
    }

  };

  $.fn.animateCallback = function (callback) {
    const end = 'animationend webkitAnimationEnd';
    return this.each(function () {
      const $this = $(this);
      $this.on(end, function () {
        $this.off(end);
        return callback.call(this);
      });
    });
  };

  $.fn.animsition = function (method) {
    if (__[method]) {
      return __[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } if (typeof method === 'object' || !method) {
      return __.init.apply(this, arguments);
    }
    $.error(`Method ${method} does not exist on jQuery.${namespace}`);
  };
}));
