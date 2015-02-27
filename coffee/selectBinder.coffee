( ( $ ) ->
  $.fn.TeraSelectBinder = (options) ->
    $.fn.replaceTagName = (replaceWith) ->
      tags = []
      i = this.length;
      while (i--)
        newElement = document.createElement(replaceWith)
        thisi = this[i]
        thisia = thisi.attributes

        for attrib in thisia
          newElement.setAttribute(attrib.name, attrib.value)

        newElement.innerHTML = thisi.innerHTML
        $(thisi).after(newElement).remove()
        tags[i] = newElement
      $(tags);


    settings = $.extend {
      policy: 'hide',
      optSelector : 'optgroup'
    }, options

    this.each () ->
      hider = (selected, groups) ->
        opSelected = false
        groups.each () ->
          if $(this).data('name') not in selected
            switch(settings['policy'])
              when 'hide'
                $(this).replaceTagName('span').hide()
              when 'disabled'
                $(this).attr('disabled', 'disabled')

            if settings['optSelector'] == 'option' and $(this).is(':selected')
              $(this).removeAttr('selected')
            else if settings['optSelector'] == 'optgroup' and $(this).children('option').filter(':selected').length
              $(this).children('option').filter(':selected').each ()-> $(this).removeAttr('selected')

          else
            switch settings['policy']
              when 'hide'
                $(this).replaceTagName(settings['optSelector']).show()
              when 'disabled'
                $(this).removeAttr('disabled')

            if !opSelected
              if settings['optSelector'] == 'option'
                $(this).attr('selected', 'selected')
                opSelected = true
              else if settings['optSelector'] == 'optgroup'
                $(this).children('option:first').attr('selected', 'selected')
              opSelected = true

      if !$(this).data('binded') then return this
      binded = $(this).data('binded').split(',')
      selectedTMP = $(this).find('option').filter(':selected')
      selected = []
      selectedTMP.each ()-> selected.push $(this).data('rel')

      for b in binded
        elt = $('#' + b)
        hider selected, elt.children(settings['optSelector'])

      $(this).on 'change', () ->
        selectedTMP = $(this).find('option').filter(':selected')
        selected = []
        selectedTMP.each ()-> selected.push $(this).data('rel')
        for b in binded
          elt = $('#' + b)
          hider selected, elt.children(settings['optSelector']+", span")
          elt.change()

    this
) jQuery