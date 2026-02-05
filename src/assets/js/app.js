$(function () {
  "use strict";

  if ($(".app-container").length) {
    new PerfectScrollbar(".app-container");
  }
  if ($(".header-message-list").length) {
    new PerfectScrollbar(".header-message-list");
  }
  if ($(".header-notifications-list").length) {
    new PerfectScrollbar(".header-notifications-list");
  }

  if ($(".mobile-search-icon").length) {
    $(".mobile-search-icon").on("click", function () {
      $(".search-bar").addClass("full-search-bar");
    });
  }

  if ($(".search-close").length) {
    $(".search-close").on("click", function () {
      $(".search-bar").removeClass("full-search-bar");
    });
  }

  if ($(".mobile-toggle-menu").length) {
    $(".mobile-toggle-menu").on("click", function () {
      $(".wrapper").addClass("toggled");
    });
  }

  /* ===== DARK MODE (THIS WAS BREAKING) ===== */
  if ($(".dark-mode").length && $(".dark-mode-icon i").length) {
    $(".dark-mode").on("click", function () {
      const icon = $(".dark-mode-icon i");

      if (icon.hasClass("bx-sun")) {
        icon.attr("class", "bx bx-moon");
        $("html").attr("class", "light-theme");
      } else {
        icon.attr("class", "bx bx-sun");
        $("html").attr("class", "dark-theme");
      }
    });
  }

  if ($(".toggle-icon").length) {
    $(".toggle-icon").on("click", function () {
      if ($(".wrapper").hasClass("toggled")) {
        $(".wrapper").removeClass("toggled");
        $(".sidebar-wrapper").unbind("hover");
      } else {
        $(".wrapper").addClass("toggled");
        $(".sidebar-wrapper").hover(
          function () {
            $(".wrapper").addClass("sidebar-hovered");
          },
          function () {
            $(".wrapper").removeClass("sidebar-hovered");
          }
        );
      }
    });
  }

  /* Back to top */
  if ($(".back-to-top").length) {
    $(window).on("scroll", function () {
      $(this).scrollTop() > 300
        ? $(".back-to-top").fadeIn()
        : $(".back-to-top").fadeOut();
    });

    $(".back-to-top").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
      return false;
    });
  }

  /* Metis menu */
  if ($("#menu").length) {
    $("#menu").metisMenu();
  }

  /* Switcher */
  if ($(".switcher-btn").length) {
    $(".switcher-btn").on("click", function () {
      $(".switcher-wrapper").toggleClass("switcher-toggled");
    });
  }

  if ($(".close-switcher").length) {
    $(".close-switcher").on("click", function () {
      $(".switcher-wrapper").removeClass("switcher-toggled");
    });
  }

  /* Theme radios */
  $("#lightmode").length && $("#lightmode").on("click", () => $("html").attr("class", "light-theme"));
  $("#darkmode").length && $("#darkmode").on("click", () => $("html").attr("class", "dark-theme"));
  $("#semidark").length && $("#semidark").on("click", () => $("html").attr("class", "semi-dark"));
  $("#minimaltheme").length && $("#minimaltheme").on("click", () => $("html").attr("class", "minimal-theme"));

  /* Header colors */
  for (let i = 1; i <= 8; i++) {
    const el = $("#headercolor" + i);
    if (el.length) {
      el.on("click", function () {
        $("html")
          .addClass("color-header headercolor" + i)
          .removeClass(
            "headercolor1 headercolor2 headercolor3 headercolor4 headercolor5 headercolor6 headercolor7 headercolor8"
          );
      });
    }
  }

  /* Sidebar colors */
  for (let i = 1; i <= 8; i++) {
    const el = $("#sidebarcolor" + i);
    if (el.length) {
      el.on("click", function () {
        $("html").attr("class", "color-sidebar sidebarcolor" + i);
      });
    }
  }
});
