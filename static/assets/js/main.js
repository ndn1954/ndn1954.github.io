/**
* Template Name: Appland - v2.0.0
* Template URL: https://bootstrapmade.com/free-bootstrap-app-landing-page-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {
        var scrollto = target.offset().top;
        var scrolled = 20;
        if ($('#header').length) {
          scrollto -= $('#header').outerHeight()
          if (!$('#header').hasClass('header-scrolled')) {
            scrollto += scrolled;
          }
        }
        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');
    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });
    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });
    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center: true,
    margin: 25,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      }
    }
  });

  // Initiate venobox lightbox
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      900: {
        items: 2
      }
    }
  });

  // Initi AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out"
  });

})(jQuery);

//========================================================================
// Drag and drop image handling
//========================================================================

//var fileDrag = document.getElementById("file-drag");
var fileSelect = document.getElementById("file-upload-front");
var leftSelect = document.getElementById("file-upload-left");
var bntSelect = document.getElementById("file-upload-bnt");
var roofSelect = document.getElementById("file-upload-roof");
var rightSelect = document.getElementById("file-upload-right");
var rearSelect = document.getElementById("file-upload-back");

// Add event listeners
fileSelect.addEventListener("change", function(){fileSelectHandler(event,"bmp");}, false);
bntSelect.addEventListener("change", function(){fileSelectHandler(event,"bnt");}, false);
roofSelect.addEventListener("change", function(){fileSelectHandler(event,"roof");}, false);
leftSelect.addEventListener("change", function(){fileSelectHandler(event,"leftside");}, false);
rightSelect.addEventListener("change", function(){fileSelectHandler(event,"rightside");}, false);
rearSelect.addEventListener("change", function(){fileSelectHandler(event,"rearbmp");}, false);

function fileSelectHandler(e,comp) {
  // handle file selecting
  var files = e.target.files || e.dataTransfer.files;
  //Get number of images already uploaded by user
  let imgCnt = document.getElementById(comp).childElementCount;
  //Total number of images per components restricted to 5
  if(parseInt(files.length)>5 || (imgCnt+parseInt(files.length)) > 5){
	  alert("You can upload only 5 image per motor part");
	  return;
  }
  for (var i = 0, f; (f = files[i]); i++) {
    previewFile(f,comp,i);
  }
}

//========================================================================
// Web page elements for functions to use
//========================================================================

var imagePreview = document.getElementById("image-front");
var imageDisplay = document.getElementById("image-display");
//var uploadCaption = document.getElementById("upload-caption");
var predResult = document.getElementById("pred-result");
var predDloc = document.getElementById("pred-d-loc");
var predDsev = document.getElementById("pred-d-sev");
var loader = document.getElementById("loader");
var predEstimate = document.getElementById("pred-estimate");
var upload_image;
var upimg = {bmp:[],bnt:[],leftside:[],rightside:[],roof:[],rearbmp:[]};

//========================================================================
// Main button events
//========================================================================

function submitImage() {
  // action for the submit button
  //console.log("submit");

  let bmpImgCnt = document.getElementById('bmp').childElementCount;
  let bntImgCnt = document.getElementById('bnt').childElementCount;
  let roofImgCnt = document.getElementById('roof').childElementCount;
  let rearbmpImgCnt = document.getElementById('rearbmp').childElementCount;
  let leftsideImgCnt = document.getElementById('leftside').childElementCount;
  let rightsideImgCnt = document.getElementById('rightside').childElementCount;
  if (bmpImgCnt==0 && bntImgCnt==0 && roofImgCnt==0 && rearbmpImgCnt==0 &&
    leftsideImgCnt==0 && rightsideImgCnt==0) {
    window.alert("Please select an image before submit.");
    return;
  }


  
  loader.classList.remove("hidden");
  imageDisplay.classList.add("loading");
  
  // call the predict function of the backend
  predictImage(upimg);
}

function clearImage() {
  // reset selected files
  fileSelect.value = "";
  imageDisplay.classList.remove("loading");
  hide(loader);
  //Clear image thumbnails
  $('#file-upload-front').val("");
  $('#file-upload-bnt').val("");
  $('#file-upload-left').val("");
  $('#file-upload-right').val("");
  $('#file-upload-roof').val("");
  $('#file-upload-back').val("");
  $('#bmp').empty();
  $('#bnt').empty();
  $('#leftside').empty();
  $('#roof').empty();
  $('#rightside').empty();
  $('#rearbmp').empty();
  $('#bmp_result').empty();
  $('#bnt_result').empty();
  $('#leftside_result').empty();
  $('#roof_result').empty();
  $('#rightside_result').empty();
  $('#rearbmp_result').empty();
  $('#assessment_result').empty();
}

function previewFile(file,comp,indx) {
  // show the preview of the image
  //console.log(file.name);
  var fileName = encodeURI(file.name);

  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
	img = document.createElement('img');
	img.src = URL.createObjectURL(file);
	img.width = 35;
	img.height = 35;
  img.id = comp+indx;
	imgbx = document.getElementById(comp);

	if ( imgbx != null){
		imgbx.appendChild(img);
	}
	
    // reset
    upimg[comp].push(reader.result);
    upload_image = reader.result;
  };
}

//========================================================================
// Helper functions
//========================================================================

function predictImage(image) {
  fetch("/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(image)
  })
    .then(resp => {
      if (resp.ok)
        resp.json().then(data => {
          displayResult(data);
        });
      else{
        clearImage();
        window.alert("Oops! Something went wrong. Please try again");
      }
    })
    .catch(err => {
      clearImage();
      console.log("An error occured", err.message);
      window.alert("Oops! Something went wrong.");
    });
}

function displayImage(image, id) {
  // display image on given id <img> element
  let display = document.getElementById(id);
  display.src = image;
  show(display);
}

function displayResult(data) {
  imageDisplay.classList.remove("loading");
  hide(loader);
  // display the result
  //Prase the damage inspection to generate final result for each damage assesment
  // Sample data
  //Sev: {'bmp': ['Major', 'Major'], 'bnt': ['FullCar', 'Major'], 'leftside': [], 'rightside': [], 'roof': [], 'rearbmp': []}
  let overallAssessment = 0;
  for (const [key, value] of Object.entries(data.dsev)) {
    console.log(key, value);
    var i=0;
    var count = {};
    value.forEach(item => {
      //Count the number of times same type detection has happend
      count[item] = (count[item] || 0) + 1;
      //Check if it is FullCar or Damaged Part and add style sheet
      if(item=='FullCar'){
        let img_to_grey = document.getElementById(key+i);
        img_to_grey.classList.add("disable");
        img_to_grey.title = item;
        i++;
      }
      else{
        let imgTitle = document.getElementById(key+i);
        imgTitle.title = item;
      }
    });
    //console.log('Count:',count);
    
    //Remove FullCar count
    if('FullCar' in count){
      delete count['FullCar']
    }
    //console.log('Count 2:',count);
    
    let div = document.createElement('div');
    let dmgSev = (Object.keys(count)[0]);
    //console.log('Sev:'+dmgSev);
    if(dmgSev !=null){
      if(dmgSev.indexOf('Major')!= -1){
        div.textContent = 'Major Damage';
      }else if(dmgSev.indexOf('Minor')!=-1){
        div.textContent = 'Minor/Scratch Damage'
      }else{
        div.textContent = ''
      }
    }
    //Append one result for all images per row
    cmp_result_bx = document.getElementById(key+'_result');
    if ( cmp_result_bx != null){
      cmp_result_bx.appendChild(div);
    }
  }
  //Evaluvate over all damage assessment
  //console.log('overallAssessment:'+data.dEstimate);
  let div = document.createElement('div');
  let overAllAssess = document.getElementById('assessment_result');
  div.textContent = data.dEstimate + "/-";

  overAllAssess.appendChild(div);

}

function hide(el) {
  // hide an element
  el.classList.add("hidden");
}

function show(el) {
  // show an element
  el.classList.remove("hidden");
}