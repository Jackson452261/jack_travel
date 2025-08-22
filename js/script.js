// Preloader
$(window).on("load", function () {
  $(".preloader").delay(1000).fadeOut('slow');
});

$(function () {
  // Header scroll
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 0) {
      $(".header").addClass("active");
    } else {
      $(".header").removeClass("active");
    }
  });

  // Mobile menu
  $(".header__burger").on("click", function () {
    $(".menu").addClass("active");
    $("body").addClass("lock");
  });

  $(".menu__close").on("click", function () {
    $(".menu").removeClass("active");
    $("body").removeClass("lock");
  });

  $(window).on("resize", function() {
    $(".menu").removeClass("active");
    $("body").removeClass("lock");
  })

  // Testimonials Slider
  const swiperTestimonial = new Swiper(".testimonials__slider", { 
    spaceBetween: 20,
    loop: true,
    autoHeight: true,
    grabCursor: true,
    allowTouchMove: true,
    speed: 500,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    // Responsive breakpoints
    breakpoints: {

        // when window width is <= 499px
        499: {
            slidesPerView: 1,
        },
        // when window width is <= 700px
        700: {
            slidesPerView: 1.2,
        },
        // when window width is <= 850px
        850: {
            slidesPerView: 1.4,
        },
        // when window width is <= 950px
        950: {
            slidesPerView: 1.5,
        },
        // when window width is < 1150px
        1150: {
            slidesPerView: 2,
        }
    }    
  });

  // Portfolio Popup
  $(".portfolio__body a").on('click', function(e) {
    e.preventDefault();
  });
  
  $(".portfolio__body").magnificPopup({
    delegate: "a",
    type: "image",
    closeOnContentClick: false,
    closeBtnInside: true,
    mainClass: 'mfp-img-mobile',
    image: {
    verticalFit: true,
    cursor: null,
    },
    gallery: {
    enabled: true,
    },
    zoom: {
    enabled: true,
    duration: 300,
    easing: 'ease-in',
    opener: function (element) {
        return element.find("img");
      },
    }
  });

  // Blog Post Image Lightbox
  $(".blog-post__content a").on('click', function(e) {
    e.preventDefault();
  });
  
  $(".blog-post__content").magnificPopup({
    delegate: "a",
    type: "image",
    closeOnContentClick: false,
    closeBtnInside: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true,
      cursor: null,
    },
    gallery: {
      enabled: true,
    },
    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in',
      opener: function (element) {
        return element.find("img");
      },
    }
  });

  // Portfolio Filter
  $("[data-filter]").on("click", function (event) {
    event.preventDefault();

    $(this).addClass("active").siblings().removeClass("active");

    let cat = $(this).data("filter");

    if (cat == "all") {
      $("[data-cat]").removeClass("hide");
    } else {
      $("[data-cat]").each(function () {
        let workCat = $(this).data("cat");

        if (workCat != cat) {
          $(this).addClass("hide");
        } else {
          $(this).removeClass("hide");
        }
      });
    }
  });

  // Blog Navigation - Remove this section since we're using direct HTML links
  // The blog cards now use direct HTML links which work better

  // Questions Spoller
  $(".questions__label").on("click", function () {
    if ($(".questions__block").hasClass("single")) {
      $(".questions__label").not($(this)).removeClass("active");
      $(".questions__text").not($(this).next()).slideUp(300);
    }
    $(this).toggleClass("active").next().slideToggle(300);
  });

});

 

// Download Prevention Functions避免參觀者右鍵下載圖片
function preventDownload() {
  // Disable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable drag and drop for images
  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });

  // Disable text selection
  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Disable F12 (Developer Tools)
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    
    // Disable Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
      return false;
    }
    
    // Disable Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      e.preventDefault();
      return false;
    }
    
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }
    
    // Disable Ctrl+S (Save Page)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }
    
    // Disable Ctrl+A (Select All)
    if (e.ctrlKey && e.keyCode === 65) {
      e.preventDefault();
      return false;
    }
    
    // Disable Ctrl+P (Print)
    if (e.ctrlKey && e.keyCode === 80) {
      e.preventDefault();
      return false;
    }
  });

  // Disable image dragging specifically
  const images = document.querySelectorAll('img');
  images.forEach(function(img) {
    img.addEventListener('dragstart', function(e) {
      e.preventDefault();
      return false;
    });
    
    // Add additional protection attributes
    img.setAttribute('draggable', 'false');
    img.setAttribute('ondragstart', 'return false;');
    img.setAttribute('onselectstart', 'return false;');
    img.setAttribute('oncontextmenu', 'return false;');
  });

  // Disable text selection on specific elements
  const protectedElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
  protectedElements.forEach(function(element) {
    element.style.webkitUserSelect = 'none';
    element.style.mozUserSelect = 'none';
    element.style.msUserSelect = 'none';
    element.style.userSelect = 'none';
  });

  // Console warning message
  console.clear();
  console.log('%c⚠️ 內容受到保護', 'color: red; font-size: 20px; font-weight: bold;');
  console.log('%c此網站的內容受到版權保護，禁止下載或複製。', 'color: red; font-size: 14px;');
}

// Initialize download prevention when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  preventDownload();
});

 // 初始化 EmailJS
 emailjs.init("RvmnIgqG2GJBGiEl_"); // 替換為你的 EmailJS Public Key

 document.getElementById("contact-form").addEventListener("submit", function(event) {
     event.preventDefault(); // 防止表單刷新

     // 獲取按鈕
     let submitButton = document.querySelector(".submit-button");
     submitButton.innerText = "發送中..."; // 🔥 改變按鈕文字
     submitButton.disabled = true; // 🔥 禁用按鈕，避免重複點擊

     emailjs.sendForm("service_oky9hqs", "template_p0fotos", this)
         .then(function(response) {
             alert("訊息已成功發送！");
             console.log("SUCCESS!", response.status, response.text);

             // ✅ 重置按鈕
             submitButton.innerText = "發送訊息";
             submitButton.disabled = false;

             // ✅ 重置表單
             document.getElementById("contact-form").reset();
         }, function(error) {
             alert("發送失敗，請稍後再試！");
             console.log("FAILED...", error);

             // ✅ 如果失敗，恢復按鈕狀態
             submitButton.innerText = "發送訊息";
             submitButton.disabled = false;
         });
 });

  