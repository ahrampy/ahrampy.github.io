$(function () {
  var centerX, centerY;
  var tracking = true;
  var mobile = false;
  var colorMode = "light";
  var currMode = "light";
  var toggle = null;
  var checkDarkMode = function () {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDark();
    }
  };
  var setDark = function () {
    colorMode = "dark";
    $("#lightswitch").attr("src", "./images/mode/moon-filled.png");
    $("#border").css({ background: "linear-gradient(#9198e5, #f48e62)" });
    $(":root").css("--primary", "#333");
    $(":root").css("--secondary", "#fff");
  };
  var setLight = function () {
    colorMode = "light";
    $("#lightswitch").attr("src", "./images/mode/sun-filled.png");
    $("#border").css({ background: "linear-gradient(#f48e62, #9198e5)" });
    $(":root").css("--primary", "#fff");
    $(":root").css("--secondary", "#333");
  };
  // var fadeIn = function () {
  //   $("#fade-in").animate({ height: "0%" }, { duration: 950, queue: false });
  //   setTimeout(() => {
  //     $("#fade-in").css("opacity", 0);
  //   }, 900);
  // };
  var resetBorder = function () {
    $("#border").css("transform", "none");
  };
  var hideFront = function () {
    $("#flip-card-front").css("opacity", "0%");
    $("#techs").slick("slickPause");
  };
  var showFront = function () {
    $("#flip-card-front").css("opacity", "100%");
    $("#techs").slick("slickPlay");
  };
  $(window).on("load resize", () => {
    checkDarkMode();
    mobile = $(window).innerHeight() < 700 || $(window).innerWidth() < 700;
    if (mobile) return resetBorder();
    centerX = $("#border-container").width() / 2;
    centerY = $("#border-container").height() / 2;
  });
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      e.matches ? setDark() : setLight();
    });
  $("#lightswitch").on("mouseover", (e) => {
    currMode = colorMode;
    $("#switch-box").css("opacity", "0");
    clearTimeout(toggle);
    toggle = setTimeout(() => {
      if (colorMode === "light") {
        e.target.src = "./images/mode/moon.png";
      } else {
        e.target.src = "./images/mode/sun.png";
      }
      $("#switch-box").css("opacity", "1");
    }, 200);
  });
  $("#lightswitch").on("mouseleave", (e) => {
    if (currMode === colorMode) {
      $("#switch-box").css("opacity", "0");
    }
    clearTimeout(toggle);
    toggle = setTimeout(() => {
      if (colorMode === "light") {
        e.target.src = "./images/mode/sun-filled.png";
      } else {
        e.target.src = "./images/mode/moon-filled.png";
      }
      $("#switch-box").css("opacity", "1");
    }, 200);
  });
  $("#lightswitch").on("click tap", (e) => {
    e.preventDefault();
    currMode = colorMode;
    if (colorMode === "light") {
      setDark();
    } else {
      setLight();
    }
  });
  $("#border-container").on("mousemove", (e) => {
    if (tracking && !mobile) {
      $("#border").css(
        "transform",
        `rotateX(${(
          ((e.pageY - centerY) * -1) /
          $("#border").outerHeight() /
          2
        ).toFixed(2)}deg) rotateY(${(
          (e.pageX - centerX) /
          $("#border").outerWidth() /
          2
        ).toFixed(2)}deg)`
      );
    }
  });
  $("#resume-frame").on(
    "hover",
    () => {
      tracking = false;
      resetBorder();
    },
    () => {
      tracking = true;
    }
  );
  $("#techs").slick({
    vertical: true,
    autoplay: true,
    arrows: false,
    accessibility: false,
    autoplaySpeed: 1000,
    speed: 500,
    zIndex: 1,
  });
  $("#techs").on("beforeChange", (e, slick, curr) => {
    $("#tech-name").html("");
  });
  $(".tech-img").on(
    "hover",
    (e) => {
      $("#tech-name").html(e.target.alt);
      $("#tech-name").css("opacity", "100%");
    },
    () => {
      $("#tech-name").css("opacity", "0%");
    }
  );
  $(".project-card").on("click tap", (e) => {
    $(e.currentTarget.children[0].click());
  });
  $("#about-btn").on("click tap", (e) => {
    e.preventDefault();
    if (mobile) {
      alert("testing!")
    }
    hideFront();
    $("#about").css("display", "inline-block");
    $("#about").css("opacity", "100%");
    $("#flip-card").css("transform", "rotateY(180deg)");
  });
  $("#about-back").on("click tap", (e) => {
    e.preventDefault();
    $("#about").css("opacity", "0%");
    setTimeout(() => {
      $("#about").css("display", "none");
    }, 300);
    $("#flip-card").css("transform", "rotateY(0deg)");
    showFront();
  });
  $("#about-contact").on("click tap", (e) => {
    e.preventDefault();
    $("#about").css("opacity", "0%");
    setTimeout(() => {
      $("#about").css("display", "none");
    }, 300);
    $("#flip-card").css("transform", "rotateY(0deg)");
    setTimeout(() => {
      $("#contact").css("display", "inline-block");
      $("#contact").css("opacity", "100%");
      $("#flip-card").css("transform", "rotateY(-180deg)");
    }, 300);
  });
  $("#projects-btn").on("click tap", (e) => {
    e.preventDefault();
    hideFront();
    $("#projects").css("display", "block");
    $("#projects").css("opacity", "100%");
    $("#flip-card").css("transform", "rotateX(180deg)");
  });
  $("#projects-back").on("click tap", (e) => {
    e.preventDefault();
    $("#projects").css("opacity", "0%");
    setTimeout(() => {
      $("#projects").css("display", "none");
    }, 300);
    $("#flip-card").css("transform", "rotateX(0deg)");
    showFront();
  });
  $("#resume-btn").on("click tap", (e) => {
    e.preventDefault();
    hideFront();
    tracking = false;
    $("#border").css("transform", "none");
    $("#resume").css("display", "inline-block");
    $("#resume").css("opacity", "100%");
    $("#flip-card").css("transform", "rotateX(-180deg)");
  });
  $("#resume-back").on("click tap", (e) => {
    e.preventDefault();
    tracking = true;
    $("#resume").css("opacity", "0%");
    setTimeout(() => {
      $("#resume").css("display", "none");
    }, 300);
    $("#flip-card").css("transform", "rotateX(0deg)");
    showFront();
  });
  $("#contact-btn").on("click tap", (e) => {
    e.preventDefault();
    hideFront();
    $("#contact").css("display", "inline-block");
    $("#contact").css("opacity", "100%");
    $("#flip-card").css("transform", "rotateY(-180deg)");
  });
  $("#contact-back").on("click tap", (e) => {
    e.preventDefault();
    $("#contact").css("opacity", "0%");
    setTimeout(() => {
      $("#contact").css("display", "none");
    }, 300);
    $("#flip-card").css("transform", "rotateY(0deg)");
    showFront();
  });
});
