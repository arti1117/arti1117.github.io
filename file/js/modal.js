$(document).ready(function(){

  // 프로젝트 모달씨
  var modalText = {
    rpa: {
      title: 'RPA 업무자동화',
      tag: '2019.08 ~ 2019.09 / 로봇 프로세스 자동화 / SoftBank',
      detail: '일본 소프트뱅크의 RPA 업무자동화 소프트웨어 「Synchroid」를 사용하여, 각 물류창고 서버를 체크하는 프로세스를 만들었습니다. 기존의 서버상태를 확인하는 업무의 자동화에 따라 하루 업무량의 12% 정도를 개선할 수 있게 되엇습니다 .',
      link: ''
    },
    hikkoshi: {
      title: '이사비용 결제시스템',
      tag: '2019.06 ~ 2019.08 / 移徙(이사)비용 처리 / 소비세 개정',
      detail: '사내직원들의 이사에 따른 비용을 청구하고 집행 및 결제하는 시스템입니다. 일본 소비세 개정안에 따른 청구비용 변화를 적용, 이사 목적에 따른 프로세스 로직 튜닝, 부서별 코드를 검색기능을 추가하고, 버그 수정 및 인터페이스를 개선했습니다.',
      link: ''
    },
    bander: {
      title: '반다: 데이터 관리시스템',
      tag: '2019.04 ~ 2019.06 / 타이어 스캔 이미지 / 자동관리 / Sick AG',
      detail: '출고하는 타이어를 스캔한 이미지와 로그를 시스템에서 서버로 옮기고, 시간에 따라서 분류하고, 시스템 용량관리를 위해 오래된 것은 지우는 프로세스를 자동으로 관리하는 프로그램을 만들었습니다. 대량의 데이터를 실수로 삭제하는 잘못을 했지만, 이를 통해 방어적인 프로그래밍을 하는 계기가 되었습니다.',
      link: ''
    },
    bsb: {
      title: '브리지스톤 부쯔류',
      tag: '2019.02 ~ 2019.09 / 물류시스템 / 유지보수 / 서버운영',
      detail: '일본 전역의 브리지스톤 타이어의 입/출고를 관리하고, 현지에 맞는 시스템을 개발하고 낙후된 시스템을 유지보수하는 업무를 맡았습니다. 윈도우 운영체제를 기반으로하는 물류시스템 서버를 운영하며 시스템 엔지니어로서 안정적인 서비스가 지속가능할 수 있도록 노력했습니다.',
      link: ''
    },
    scm: {
      title: 'SCM 혁명',
      tag: '2018.05 ~ 2019.01 / 공급망 관리 / 스마트팩토리 / JDA',
      detail: '브리지스톤 일본의 생산공장 스마트팩토리화에 따른 데이터베이스 구축 프로젝트로서 데이터 분석하고 입출력 인터페이스를 개발하는 업무를 맡았습니다. 150명 규모의 프로젝트로 빅 데이터를 기반으로한 JDA 솔루션을 바탕으로 타이어 생산 공장의 스마트팩토리 플랫폼을 구축했습니다.',
      link: ''
    },
    hyouji: {
      title: '표시인증 I/O',
      tag: '2018.02 ~ 2018.05 / 타이어 정보 / 문자열 분석',
      detail: '타이어 정보가 있는 사이드 월의 문자열을 분석하는 업무를 맡아 타이어를 분류하고, 그 결과를 검색할 수 있는 시스템입니다. 회사 차원에서 프로젝트를 수행하며, 프로그래밍 보다는 전반적인 프로젝트 흐름과 서류업무 그리고 팀원들 간의 협력방식을 배웠습니다.',
      link: ''
    },
    bnc: {
      title: '숫자야구 추리',
      tag: '2019.01 ~ 2019.02 / 규칙기반머신 / 개인',
      detail: '플레이어의 중복되지 않는 임의의 숫자 네자리를 컴퓨터가 맞추는 게임입니다. 정해져 있는 게임 룰에 따라 결과값을 입력하면 컴퓨터는 결과값을 바탕으로 숫자를 추리하기 위해 조건들을 거쳐 다음값을 도출하게됩니다. 프로그램이 결과를 맞추면 컴퓨터의 승리이고, 무한반복을 하면 플레이어의 승리가 됩니다.',
      link: ''
    },
    kosmo31: {
      title: '영화 티켓 예매',
      tag: '2017.10 ~ 2018.01 / Spring / MVC / 웹 개발 / 팀',
      detail: '일본취업 자바개발자 양성과정 팀 프로젝트로서 극장 크기에 따른 인원수 조정화면을 맡아 참여했습니다. Spring Framework를 사용하여 기본적인 웹 페이지를 구현하였습니다. 이를 통해, 데이터의 생성, 수정, 삭제, 검색을 구현했고, jQuery를 통해 동적 웹 페이지를 만들어 보았습니다.',
      link: ''
    },
    rps: {
      title: '가위 바위 보 예상!',
      tag: '2017.05 ~ 2017.06 / 조건부확률 / 첫 프로젝트 / 개인',
      detail: '"가위, 바위, 보" 세가지 선택지를 입력하여, 다음 차례에는 플레이어가 어떤 것을 낼 것인지 미리 예상해서 화면에 출력해주는 프로그램입니다. 플레이어로 부터 얻은 입력값을 바탕으로 패턴을 형성하고, 패턴을 기반으로한 조건부확률을 계산하여 다음에 낼 것을 예상할 수 있다고 생각해 만들어 보았습니다.',
      link: '/file/html/rps.html'
    }
  };

  $('#packs .button').on('click', function(){
    fillModal(this.id);
    $('.modals').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modals, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modals, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1);});
  $('#prev').click(function(){ shiftSlide(1); });

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1); }
      if (dragPos() < -threshold) { return shiftSlide(-1); }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousels, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform','translateX(0px)'); 
    },700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) {
      $('#modal .button').addClass('visible').parent().attr('href', modalText[id].link);
    }
    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        backgroundImage: "url('/css/slides/" + id + '-' + index + ".jpg')",
        backgroundPosition: 'center',
        backgroundSize: '80%',
        backgroundRepeat: 'no-repeat'
      });
              
    });
  }
});
