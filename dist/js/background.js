/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
chrome.browserAction.onClicked.addListener(function (tab) {
  console.log('tab: ', tab); // for the current tab, inject the "inject.js" file & execute it

  chrome.tabs.executeScript(tab.id, {
    file: 'js/timer.js'
  });
});
/******/ })()
;