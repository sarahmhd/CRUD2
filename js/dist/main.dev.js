"use strict";

$(document).ready(function () {
  var cnt = 0;
  $(".fo").click(function (e) {
    e.preventDefault();
    console.log("hi num ".concat(cnt));
    cnt++; // $(".fo").hide() // display none 
    // $(".fo").show() // display block 
    // $(".fo").toggle() // display block if none or none if block 
  });
});