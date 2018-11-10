// webpack对于es模块的实现，也是基于自己实现的__webpack_require__ 和__webpack_exports__ ，装换成类似于commonjs的形式。对于es模块和commonjs混用的情况，则需要通过__webpack_require__.n的形式做一层包装来实现
(function(modules) {
  // webpackBootstrap
  // The module cache
  var installedModules = {};
  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    });
    // Execute the module function
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    // Flag the module as loaded
    module.l = true;
    // Return the exports of the module
    return module.exports;
  }
  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;
  // expose the module cache
  __webpack_require__.c = installedModules;
  // define getter function for harmony exports
  __webpack_require__.d = function(exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        configurable: false,
        enumerable: true,
        get: getter
      });
    }
  };
  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function(module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module["default"];
          }
        : function getModuleExports() {
            return module;
          };
    __webpack_require__.d(getter, "a", getter);
    return getter;
  };
  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  // __webpack_public_path__
  __webpack_require__.p = "";
  // Load entry module and return exports
  return __webpack_require__((__webpack_require__.s = 0));
})([
  function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__m__ = __webpack_require__(1);

    Object(__WEBPACK_IMPORTED_MODULE_0__m__["a" /* default */])();
    Object(__WEBPACK_IMPORTED_MODULE_0__m__["b" /* foo */])();
  },
  function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    /* harmony export (immutable) */
    __webpack_exports__["a"] = bar;
    /* harmony export (immutable) */
    __webpack_exports__["b"] = foo;

    function bar() {
      return 1;
    }
    function foo() {
      return 2;
    }
  }
]);
