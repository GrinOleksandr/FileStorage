/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "public/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/register.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/register.js":
/*!*************************!*\
  !*** ./src/register.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//*********************************************REGISTRATION HANLER**************************************\nvar RegistrationForm = document.forms['registration-form'];\nRegistrationForm.addEventListener('submit', formSubmit); // const LoginField = document.getElementById(\"login\");\n// const EmailField = document.getElementById(\"email\");\n// const PasswordField = document.getElementById(\"password\");\n\nfunction formSubmit(ev) {\n  ev.preventDefault();\n  alert(\"FORM IS SENT\");\n  console.log(\"***********FORM SUBMITTED***********\");\n  console.log(\"login: \".concat(RegistrationForm.elements['login'].value));\n  console.log(\"Email: \".concat(RegistrationForm.elements['email'].value));\n  console.log(\"pass: \".concat(RegistrationForm.elements['password'].value));\n  console.log(\"************************************\");\n  var request = new XMLHttpRequest();\n  request.open('POST', \"/user/register\");\n  var formData = new FormData(RegistrationForm);\n  request.send(formData);\n  RegistrationForm.reset();\n  alert(\"Registration Complete\");\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVnaXN0ZXIuanM/Y2IxNiJdLCJuYW1lcyI6WyJSZWdpc3RyYXRpb25Gb3JtIiwiZG9jdW1lbnQiLCJmb3JtcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb3JtU3VibWl0IiwiZXYiLCJwcmV2ZW50RGVmYXVsdCIsImFsZXJ0IiwiY29uc29sZSIsImxvZyIsImVsZW1lbnRzIiwidmFsdWUiLCJyZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsInNlbmQiLCJyZXNldCJdLCJtYXBwaW5ncyI6IkFBQ0E7QUFDQSxJQUFNQSxnQkFBZ0IsR0FBR0MsUUFBUSxDQUFDQyxLQUFULENBQWUsbUJBQWYsQ0FBekI7QUFDQUYsZ0JBQWdCLENBQUNHLGdCQUFqQixDQUFrQyxRQUFsQyxFQUE0Q0MsVUFBNUMsRSxDQUVBO0FBQ0E7QUFDQTs7QUFJQSxTQUFTQSxVQUFULENBQW9CQyxFQUFwQixFQUF1QjtBQUNuQkEsSUFBRSxDQUFDQyxjQUFIO0FBQ0FDLE9BQUssQ0FBQyxjQUFELENBQUw7QUFDQUMsU0FBTyxDQUFDQyxHQUFSLENBQVksc0NBQVo7QUFFQUQsU0FBTyxDQUFDQyxHQUFSLGtCQUFzQlQsZ0JBQWdCLENBQUNVLFFBQWpCLENBQTBCLE9BQTFCLEVBQW1DQyxLQUF6RDtBQUNBSCxTQUFPLENBQUNDLEdBQVIsa0JBQXNCVCxnQkFBZ0IsQ0FBQ1UsUUFBakIsQ0FBMEIsT0FBMUIsRUFBbUNDLEtBQXpEO0FBQ0FILFNBQU8sQ0FBQ0MsR0FBUixpQkFBcUJULGdCQUFnQixDQUFDVSxRQUFqQixDQUEwQixVQUExQixFQUFzQ0MsS0FBM0Q7QUFDQUgsU0FBTyxDQUFDQyxHQUFSLENBQVksc0NBQVo7QUFHQSxNQUFJRyxPQUFPLEdBQUcsSUFBSUMsY0FBSixFQUFkO0FBQ0FELFNBQU8sQ0FBQ0UsSUFBUixDQUFhLE1BQWI7QUFDQSxNQUFJQyxRQUFRLEdBQUcsSUFBSUMsUUFBSixDQUFhaEIsZ0JBQWIsQ0FBZjtBQUNBWSxTQUFPLENBQUNLLElBQVIsQ0FBYUYsUUFBYjtBQUNBZixrQkFBZ0IsQ0FBQ2tCLEtBQWpCO0FBQ0FYLE9BQUssQ0FBQyx1QkFBRCxDQUFMO0FBRUgiLCJmaWxlIjoiLi9zcmMvcmVnaXN0ZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqUkVHSVNUUkFUSU9OIEhBTkxFUioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5jb25zdCBSZWdpc3RyYXRpb25Gb3JtID0gZG9jdW1lbnQuZm9ybXNbJ3JlZ2lzdHJhdGlvbi1mb3JtJ107XG5SZWdpc3RyYXRpb25Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZvcm1TdWJtaXQpO1xuXG4vLyBjb25zdCBMb2dpbkZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpblwiKTtcbi8vIGNvbnN0IEVtYWlsRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpO1xuLy8gY29uc3QgUGFzc3dvcmRGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRcIik7XG5cblxuXG5mdW5jdGlvbiBmb3JtU3VibWl0KGV2KXtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGFsZXJ0KFwiRk9STSBJUyBTRU5UXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiKioqKioqKioqKipGT1JNIFNVQk1JVFRFRCoqKioqKioqKioqXCIpO1xuXG4gICAgY29uc29sZS5sb2coYGxvZ2luOiAke1JlZ2lzdHJhdGlvbkZvcm0uZWxlbWVudHNbJ2xvZ2luJ10udmFsdWV9YCk7XG4gICAgY29uc29sZS5sb2coYEVtYWlsOiAke1JlZ2lzdHJhdGlvbkZvcm0uZWxlbWVudHNbJ2VtYWlsJ10udmFsdWV9YCk7XG4gICAgY29uc29sZS5sb2coYHBhc3M6ICR7UmVnaXN0cmF0aW9uRm9ybS5lbGVtZW50c1sncGFzc3dvcmQnXS52YWx1ZX1gKTtcbiAgICBjb25zb2xlLmxvZyhcIioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlwiKTtcblxuXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCBgL3VzZXIvcmVnaXN0ZXJgKTtcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoUmVnaXN0cmF0aW9uRm9ybSk7XG4gICAgcmVxdWVzdC5zZW5kKGZvcm1EYXRhKTtcbiAgICBSZWdpc3RyYXRpb25Gb3JtLnJlc2V0KCk7XG4gICAgYWxlcnQoXCJSZWdpc3RyYXRpb24gQ29tcGxldGVcIik7XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/register.js\n");

/***/ })

/******/ });