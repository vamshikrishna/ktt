$(window).on("load", () => {
  // Preloader
  $(".preloader").fadeOut("slow");
});

$(document).ready(() => {
  // navbar Shrink
  $(window).on("scroll", () => {
    if ($(this).scrollTop() > 90) {
      $(".navbar").addClass("navbar-shrink");
    } else {
      $(".navbar").removeClass("navbar-shrink");
    }

    // // Counter up call
    // let scroll = window.scrollY;
    // let element_position_by_number = $(".counter-trigger").offset().top;
    // // also you can get element position by offset method like this => $("element").offset().top
    // if (scroll >= element_position_by_number) {
    //   runCounter();
    // }
  });

  // Contact Form Popup
  const modal = document.getElementById("email-modal");
  const openBtn = document.querySelector(".main-btn");
  const closeBtn = document.querySelector(".close-btn");

  // $(openBtn).click(function(){
  //     // $(modal).fadeIn(1000);
  //   });

  //   $(closeBtn).click(function(){
  //     $(modal).fadeOut(1000);
  //   });

  // $(modal).click(function(e){
  //     // $('popup-wrap').fadeIn(500);
  //     $('popup-box').removeClass('transform-out').addClass('transform-in');
  //     e.preventDefault();
  // });

  // $(closeBtn).click(function(e){
  //     // $('popup-wrap').fadeOut(500);
  //     $('popup-box').removeClass('transform-in').addClass('transform-out');
  //     e.preventDefault();
  // });

  //Click Events
  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.style.transition = "all 5s ease-in";
  });
  closeBtn.addEventListener("click", () => {
    modal.style.transition = "background 5s ease-in";
    modal.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.transition = "5s";
      modal.style.display = "none";
    }
  });

  // Contact Form Validation
  const form = document.getElementById("form");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const passwordConfirm = document.getElementById("password-confirm");

  // Show Error Message
  function showError(input, message) {
    const formValidation = input.parentElement;
    formValidation.className = "form-validation error";

    const errorMessage = formValidation.querySelector("p");
    errorMessage.innerText = message;
  }

  // Show Valid Message
  function showValid(input) {
    const formValidation = input.parentElement;
    formValidation.className = "form-validation valid";
  }

  //Check Required Fields
  function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
      if (input.value.trim() === "") {
        showError(input, `${getFieldName(input)} is required`);
      } else {
        showValid(input);
      }
    });
  }

  // Check Input Length
  function checkLength(input, min, max) {
    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be atleast ${min} characters`
      );
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      );
    } else {
      showValid(input);
    }
  }

  // Check Passwords Match
  function passwordMatch(input1, input2) {
    if (input1.value !== input2.value) {
      showError(input2, "Passwords do not match");
    }
  }

  // Get fieldname
  function getFieldName(input) {
    return input.name.charAt(0).toUpperCase() + input.name.slice(1);
  }

  // Contact Form Event Listeners
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkRequired([name, email, password, passwordConfirm]);
    checkLength(name, 3, 30);
    checkLength(password, 8, 25);
    checkLength(passwordConfirm, 8, 25);
    passwordMatch(password, passwordConfirm);
  });

  // Custom Styling Contact Form

  // Video Popup
  // Make this Popup to load after clicking otherwise entire webiste is waiting at preloader
  const videoSrc = $("#player-1").attr("src");
  $(".video-play-btn-js, .video-popup").on("click", () => {
    if ($(".video-popup").hasClass("open")) {
      $(".video-popup").removeClass("open");
      $("#player-1").attr("src", "");
    } else {
      $(".video-popup").addClass("open");
      if ($("#player-1").attr("src") == "") {
        $("#player-1").attr("src", videoSrc);
      }
    }
  });

  // Change of Mouse and Arrow Animation
  const arrowCustom = document.querySelector(".arrow-custom");
  const mouseCustom = document.querySelector(".mouse-custom");

  $(() => {
    $(window)
      .resize(() => {
        if ($(this).width() >= 769) {
          // $(mouseCustom).addClass("mouse-wrap");
          // $(arrowCustom).removeClass("box");
          arrowCustom.style.display = "none";
          mouseCustom.style.display = "inline-block";
        } else {
          // $(arrowCustom).addClass("box");
          // $(mouseCustom).removeClass("mouse-wrap");
          mouseCustom.style.display = "none";
          arrowCustom.style.display = "inline-block";
        }
      })
      .resize(); //trigger resize on page load
  });


  // Counter Up on Visible Scroll
  $(function ($, win) {
    $.fn.inViewport = function (cb) {
      return this.each(function (i, el) {
        function visPx() {
          var H = $(this).height(),
            r = el.getBoundingClientRect(), t = r.top, b = r.bottom;
          return cb.call(el, Math.max(0, t > 0 ? H - t : (b < H ? b : H)));
        } visPx();
        $(win).on("resize scroll", visPx);
      });
    };
  }(jQuery, window));


  jQuery(function ($) { // DOM ready and $ in scope

    $(".number").inViewport(function (px) { // Make use of the `px` argument!!!
      // if element entered V.port ( px>0 ) and
      // if prop initNumAnim flag is not yet set
      //  = Animate numbers
      const This = $(this);
      const counterValue = document.querySelector(".counter-value");
      if (px > 0 && !this.initNumAnim) {
        this.initNumAnim = true; // Set flag to true to prevent re-running the same animation
        $(this).prop('Counter', 0).animate({
          Counter: $(this).text()
        }, {
          duration: 3500,
          easing: 'swing',
          step: function (now) {
            $(this).text(Math.ceil(now) + "+");
          },
          complete: () => {
            // This.text(this.counterValue).css({ color: "#0048ad" });
            This.text(this.counterValue).css({
              fontWeight: "bolder",
              transition: "all 0.5s ease",
              // fontSize: "1.4rem"
            });
          }
        });
      }
    });
  });

  // function runCounter() {
  //   $('.number').each(function () {
  //     const This = $(this);
  //     const counterValue = document.querySelector(".counter-value");
  //     $(this).prop('Counter', 0).animate({ Counter: $(this).text() },
  //       {
  //         duration: 3500,
  //         easing: 'swing',
  //         step: function (now) {
  //           $(this).text(Math.floor(now) + "+");
  //         },
  //         complete: () => {
  //           // This.text(this.counterValue).css({ color: "#0048ad" });
  //           This.text(this.counterValue).css({
  //             color: "#0048ad",
  //             transition: "all 0.5s ease",
  //             // fontSize: "2.3rem"
  //           });
  //           if (now == NaN) {
  //             // now.preventDefault;
  //             // Dont know how, but counter up is working without giving NaN as result after adding a simple empty if statement
  //           }
  //         }
  //       }
  //     )
  //   })
  // } // end runCounter



  // Features Carousel
  $(".features-carousel").owlCarousel({
    loop: true,
    margin: 0,
    autoplay: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  // App Screenshots Carousel
  $(".screenshots-carousel").owlCarousel({
    loop: true,
    margin: 0,
    autoplay: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });

  // Testimonials Carousel
  $(".testimonials-carousel").owlCarousel({
    loop: true,
    margin: 0,
    autoplay: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  // Testimonials Carousel
  $(".team-carousel").owlCarousel({
    loop: true,
    margin: 0,
    autoplay: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  // Page Scrolling - ScrollIt
  $.scrollIt({
    topOffset: -50,
  });

  // Navbar Collapse
  $(".nav-link").on("click", () => {
    $(".navbar-collapse").collapse("hide");
  });

  // Toggle Theme - Light and Dark Mode
  function toggleTheme() {
    if (localStorage.getItem("kubera-theme") !== null) {
      if (localStorage.getItem("kubera-theme") === "dark") {
        $("body").addClass("dark");
      } else {
        $("body").removeClass("dark");
      }
    }
    updateIcon();
  }
  toggleTheme();

  $(".toggle-theme").on("click", () => {
    $("body").toggleClass("dark");

    if ($("body").hasClass("dark")) {
      localStorage.setItem("kubera-theme", "dark");
    } else {
      localStorage.setItem("kubera-theme", "light");
    }

    updateIcon();
  });

  function updateIcon() {
    if ($("body").hasClass("dark")) {
      $(".toggle-theme i").removeClass("fa-moon");
      $(".toggle-theme i").addClass("fa-sun");
    } else {
      $(".toggle-theme i").removeClass("fa-sun");
      $(".toggle-theme i").addClass("fa-moon");
    }
  }

  // $("telegram").on("")

  // Change youtube icon to play icon
  // $(".toggle-theme i").on("click", function(){
  //     alert("Vamshi Krishna");

  // });
}); // end jquery

  // function newFunction() {
    //      //Set a same-site cookie for first-party contexts
//      document.cookie = 'cookie1=videoSrc; SameSite=Lax';
//      //Set a cross-site cookie for third-party contexts
//      document.cookie = 'cookie2=videoSrc; SameSite=None; Secure';
// }
