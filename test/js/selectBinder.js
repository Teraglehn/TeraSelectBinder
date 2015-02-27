// Generated by CoffeeScript 1.9.1
var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

(function($) {
  return $.fn.TeraSelectBinder = function(options) {
    var settings;
    $.fn.replaceTagName = function(replaceWith) {
      var attrib, i, j, len, newElement, tags, thisi, thisia;
      tags = [];
      i = this.length;
      while (i--) {
        newElement = document.createElement(replaceWith);
        thisi = this[i];
        thisia = thisi.attributes;
        for (j = 0, len = thisia.length; j < len; j++) {
          attrib = thisia[j];
          newElement.setAttribute(attrib.name, attrib.value);
        }
        newElement.innerHTML = thisi.innerHTML;
        $(thisi).after(newElement).remove();
        tags[i] = newElement;
      }
      return $(tags);
    };
    settings = $.extend({
      policy: 'hide',
      optSelector: 'optgroup'
    }, options);
    this.each(function() {
      var b, binded, elt, hider, j, len, selected, selectedTMP;
      hider = function(selected, groups) {
        var opSelected;
        opSelected = false;
        return groups.each(function() {
          var ref;
          if (ref = $(this).data('name'), indexOf.call(selected, ref) < 0) {
            switch (settings['policy']) {
              case 'hide':
                $(this).replaceTagName('span').hide();
                break;
              case 'disabled':
                $(this).attr('disabled', 'disabled');
            }
            if (settings['optSelector'] === 'option' && $(this).is(':selected')) {
              return $(this).removeAttr('selected');
            } else if (settings['optSelector'] === 'optgroup' && $(this).children('option').filter(':selected').length) {
              return $(this).children('option').filter(':selected').each(function() {
                return $(this).removeAttr('selected');
              });
            }
          } else {
            switch (settings['policy']) {
              case 'hide':
                $(this).replaceTagName(settings['optSelector']).show();
                break;
              case 'disabled':
                $(this).removeAttr('disabled');
            }
            if (!opSelected) {
              if (settings['optSelector'] === 'option') {
                $(this).attr('selected', 'selected');
                opSelected = true;
              } else if (settings['optSelector'] === 'optgroup') {
                $(this).children('option:first').attr('selected', 'selected');
              }
              return opSelected = true;
            }
          }
        });
      };
      if (!$(this).data('binded')) {
        return this;
      }
      binded = $(this).data('binded').split(',');
      selectedTMP = $(this).find('option').filter(':selected');
      selected = [];
      selectedTMP.each(function() {
        return selected.push($(this).data('rel'));
      });
      for (j = 0, len = binded.length; j < len; j++) {
        b = binded[j];
        elt = $('#' + b);
        hider(selected, elt.children(settings['optSelector']));
      }
      return $(this).on('change', function() {
        var k, len1, results;
        selectedTMP = $(this).find('option').filter(':selected');
        selected = [];
        selectedTMP.each(function() {
          return selected.push($(this).data('rel'));
        });
        results = [];
        for (k = 0, len1 = binded.length; k < len1; k++) {
          b = binded[k];
          elt = $('#' + b);
          hider(selected, elt.children(settings['optSelector'] + ", span"));
          results.push(elt.change());
        }
        return results;
      });
    });
    return this;
  };
})(jQuery);

//# sourceMappingURL=selectBinder.js.map
