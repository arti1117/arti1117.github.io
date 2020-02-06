$(function() {

  var isMobile;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
   isMobile = true;

   // Mobile height fix
   $('.height-fix').each(function(){
    var h = $(this).height();
    $(this).height(h);
   });
  }

  // Resize Resetting
  $(window).resize(function(){
    pSorting($('.filter').first());
  });

  // Sticky Nav on Mobile
  if (isMobile) {
    $('nav').addClass('fixed');
  } else {
    $('nav').addClass('desk');
  }

  // Navigation Position
  var navPos = $('nav').position().top;
  var lastPos = 0;
  var lockTimer = 0;

  $(window).on('scroll', function () {

    var pos = $(window).scrollTop();
    var pos2 = pos + 50;

    if (!isMobile) {
      if (pos >= navPos + $('nav').height() && lastPos < pos) {
        $('nav').addClass('fixed');
      }
      if (pos < navPos && lastPos > pos) {
        $('nav').removeClass('fixed');
      }
      lastPos = pos;
    }

    // Link Highlighting
    if (pos2 > $('#greetings').offset().top)      { highlightLink('greetings'); }
    if (pos2 > $('#career').offset().top)         { highlightLink('career'); }
    if (pos2 > $('#intro').offset().top)          { highlightLink('intro'); }
    if (pos2 > $('#projects').offset().top)       { highlightLink('projects'); }
    if (pos2 > $('#contact').offset().top ||
        pos + $(window).height() === $(document).height()) {
          highlightLink('contact');
    }

    // Prevent Hover on Scroll
    clearTimeout(lockTimer);
    if(!$('body').hasClass('disable-hover')) {
      $('body').addClass('disable-hover');
    }

    lockTimer = setTimeout(function(){
      $('body').removeClass('disable-hover');
    }, 500);
  });

  function highlightLink(anchor) {
    $('nav .active').removeClass('active');
    $("nav").find('[dest="' + anchor + '"]').addClass('active');
  }


  // Page Links
  $('.paging').click(function() {
    var anchor = $(this).attr("dest");
    $('.links').removeClass('visible');

    $('nav span').removeClass('active');
    $("nav").find('[dest="'+ anchor +'"]').addClass('active');

    $('html, body').animate({
      scrollTop: $('#' + anchor).offset().top
    }, 400);
  });

  $('.fa-bars').click(function() {
    $('.links').toggleClass('visible');
  });

  // Drawing google chart
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Programming Language', 'Score per Skill Level and Experience'],
      ['Oracle DB', 8],
      ['SQL Server', 6],
      ['Visual Basic', 7],
      ['Python', 5],
      ['JAVA', 4],
      ['JS', 2.5]
    ]);

    var options = {
      title: 'Programming Language Skills',
      pieHole: 0.4,
      fontName: 'ko',
      fontSize: 14,
      pieSliceText: 'label',
      pieSliceTextStyle: {fontSize: 10},
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    $(window).resize(function(){
      chart.draw(data, options);
    });
      chart.draw(data, options);
  }

  pSorting($('.filter').first());

  $('.filter').click(function(){
    pSorting(this);
  });

  function pSorting(elem) {
    var origin = $(elem).parent().offset().left;
    var position = $(elem).offset().left;
    $('.floatings').css({
      left: position - origin,
      width: $(elem).innerWidth()
    });
    $('.floatings .row').css('left', (position - origin) * -1);
  }

  // Project packages
  $('#packs').mixItUp({ });

  function mixClear() {
    setTimeout(function() { $('#packs').removeClass('waypoint'); }, 2000);
  }

  // Scrolling
  function onScrolls( items, elemTrigger ) {
    var offset = $(window).height() / (1.6);
    items.each( function() {
      var elem = $(this),
          animationClass = elem.attr('data-animation'),
          animationDelay = elem.attr('data-delay');

          elem.css({
            '-webkit-animation-delay':  animationDelay,
            '-moz-animation-delay':     animationDelay,
            'animation-delay':          animationDelay
          });

          var trigger = (elemTrigger) ? trigger : elem;

          trigger.waypoint(function() {
            elem.addClass('animated').addClass(animationClass);
            if (elem.get(0).id === 'packs') mixClear();
            },{
                triggerOnce: true,
                offset: offset
          });
    });
  }

  setTimeout(function() { onScrolls($('.waypoint')); }, 10);

  // Formspree Contact by AJAX
  $('#mailing').submit(function(e) {
    e.preventDefault();
      $.ajax({
          url: "https://formspree.io/mayejkoz",
          method: "POST",
          data: { message: $('form').serialize() },
          dataType: "json"
      }).done(function(response) {
          $('#go').addClass('expand');
          $("#mailing")[0].reset();
      });
  });
  
  $('#end').click(function() {
    $('#go').removeClass('expand');
  });

});
