webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/_guards/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_auth_service__ = __webpack_require__("../../../../../src/app/_services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        try {
            if (this.auth.loggedIn()) {
                // logged in so return true
                return true;
            }
            else {
                // not logged in so redirect to login page
                this.router.navigate(['/login']);
                return false;
            }
        }
        catch (e) {
            // not logged in so redirect to login page
            this.router.navigate(['/login']);
            return false;
        }
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
// export * from './auth.guard';
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/_services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__("../../../../angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        // public token: string;
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["JwtHelper"]();
    }
    AuthService.prototype.login = function (uname, pwd) {
        var _this = this;
        return this.http.post('api/users/auth', { username: uname, password: pwd }).map(function (response) {
            // login successful if there's a jwt token in the response
            var jresponse = response.json();
            if (jresponse) {
                if (jresponse.success) {
                    console.log(_this.jwtHelper.decodeToken(jresponse.token), _this.jwtHelper.isTokenExpired(jresponse.token));
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', jresponse.token);
                    var user = _this.jwtHelper.decodeToken(localStorage.getItem('token'))._doc;
                    console.log(JSON.stringify(user));
                    localStorage.setItem('currUser', JSON.stringify(user));
                }
                return jresponse.success;
            }
            else {
                // return false to indicate failed login
                return true;
            }
        });
    };
    AuthService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    AuthService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('currUser');
    };
    AuthService.prototype.getHeaders = function () {
        // I included these headers because otherwise FireFox
        // will request text/html instead of application/json
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Accept', 'application/json');
        return headers;
    };
    /* Credo ricavi il JWT da localStorage*/
    AuthService.prototype.loggedIn = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])('token');
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../../src/app/_services/balance.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BalanceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BalanceService = (function () {
    function BalanceService(_http) {
        this._http = _http;
    }
    BalanceService.prototype.getTodayBalanceList = function (id_store) {
        var date = new Date();
        return this._http.get('api/balance/' + date.getUTCSeconds() + '/' + id_store).map(function (data) { return data.json(); }).toPromise();
    };
    BalanceService.prototype.getBalanceList = function (id_store, date) {
        return this._http.get('api/balance/' + date.getUTCSeconds() + '/' + id_store).map(function (data) { return data.json(); }).toPromise();
    };
    BalanceService.prototype.addBalance = function (balance) {
        console.log(JSON.stringify(balance));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this._http.post('api/balance', balance, options).map(function (data) { return data.json(); }).toPromise();
    };
    return BalanceService;
}());
BalanceService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], BalanceService);

var _a;
//# sourceMappingURL=balance.service.js.map

/***/ }),

/***/ "../../../../../src/app/_services/spesa.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpesaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// tslint:disable-next-line:import-blacklist

var SpesaService = (function () {
    function SpesaService(_http) {
        this._http = _http;
    }
    /**
     * COST SECTION
     */
    SpesaService.prototype.getSpesaList = function () {
        return this._http.get('api/spese').map(function (data) { return data.json(); }).toPromise();
    };
    SpesaService.prototype.getTodaySpesaList = function (id_store) {
        console.log('================= SpesaService.getTodaySpesaList() =====================');
        console.log(id_store);
        return this._http.get('api/spese/today/' + id_store).map(function (data) { return data.json(); }).toPromise();
    };
    SpesaService.prototype.addSpesa = function (spesa) {
        console.log(JSON.stringify(spesa));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this._http.post('api/spese', spesa, options).map(function (data) { return data.json(); }).toPromise();
    };
    SpesaService.prototype.deleteCost = function (id) {
        return this._http.delete('api/spese/' + id).map(function (data) { return data.json(); }).toPromise();
    };
    SpesaService.prototype.updateCost = function (cost) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this._http.put('api/spese/' + cost._id, cost, options).map(function (data) { return data.json(); }).toPromise();
    };
    /**
     * COSTTYPE SECTION
     */
    SpesaService.prototype.addType = function (type) {
        console.log(JSON.stringify(type));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this._http.post('api/costtype', type, options).map(function (data) { return data.json(); }).toPromise();
    };
    SpesaService.prototype.getTypeList = function () {
        return this._http.get('api/costtype').map(function (data) { return data.json(); }).toPromise();
    };
    // Lista di sottocategorie data una categoria
    SpesaService.prototype.getSubTypeList = function (val) {
        console.log('PARAMETRO=' + val);
        return this._http.get('api/costtype/categories/' + val).map(function (data) { return data.json(); }).toPromise();
    };
    SpesaService.prototype.getCategoriesList = function () {
        return this._http.get('api/costtype/categories').map(function (data) { return data.json(); }).toPromise();
    };
    SpesaService.prototype.deleteCategory = function (id) {
        return this._http.delete('api/costtype/' + id).map(function (data) { return data.json(); }).toPromise();
    };
    SpesaService.prototype.updateCostType = function (cost) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this._http.put('api/costtype/' + cost._id, cost, options).map(function (data) { return data.json(); }).toPromise();
    };
    return SpesaService;
}());
SpesaService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], SpesaService);

var _a;
//# sourceMappingURL=spesa.service.js.map

/***/ }),

/***/ "../../../../../src/app/_services/store.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StoreService = (function () {
    function StoreService(_http) {
        this._http = _http;
    }
    StoreService.prototype.getStoreList = function (onlyActive) {
        if (onlyActive === void 0) { onlyActive = true; }
        if (onlyActive) {
            return this._http.get('api/stores/active').map(function (data) { return data.json(); }).toPromise();
        }
        else {
            return this._http.get('api/stores').map(function (data) { return data.json(); }).toPromise();
        }
    };
    StoreService.prototype.addStore = function (store) {
        console.log(JSON.stringify(store));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this._http.post('api/stores', store, options).map(function (data) { return data.json(); }).toPromise();
    };
    StoreService.prototype.updateStore = function (store) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this._http.put('api/stores/' + store._id, store, options).map(function (data) { return data.json(); }).toPromise();
    };
    StoreService.prototype.delete = function (id) {
        return this._http.delete('api/stores/' + id).map(function (data) { return data.json(); }).toPromise();
    };
    return StoreService;
}());
StoreService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], StoreService);

var _a;
//# sourceMappingURL=store.service.js.map

/***/ }),

/***/ "../../../../../src/app/_services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
    }
    UserService.prototype.getUserList = function () {
        return this._http.get('api/users').map(function (data) { return data.json(); }).toPromise();
    };
    UserService.prototype.addUser = function (user) {
        console.log(JSON.stringify(user));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this._http.post('api/users', user, options).map(function (data) { return data.json(); }).toPromise();
    };
    UserService.prototype.delete = function (id) {
        return this._http.delete('api/users/' + id).map(function (data) { return data.json(); }).toPromise();
    };
    UserService.prototype.update = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this._http.put('api/users/' + user._id, user, options).map(function (data) { return data.json(); }).toPromise();
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/app/app-routes.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_guards_auth_guard__ = __webpack_require__("../../../../../src/app/_guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_management_management_component__ = __webpack_require__("../../../../../src/app/management/management.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var appRoutes = [
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_2_app_login_login_component__["a" /* LoginComponent */] },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_4_app_home_home_component__["a" /* HomeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3_app_guards_auth_guard__["a" /* AuthGuard */]] },
    {
        path: 'manage',
        children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_5_app_management_management_component__["a" /* ManagementComponent */] },
        ]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(appRoutes, { enableTracing: true } // <-- debugging purposes only
            )
        ],
        providers: [],
        bootstrap: [],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routes.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" style=\"height:100%\">\n  <div fxLayout=\"row\" fxLayoutAlign=\"space-around center\">\n    <app-header></app-header>\n  </div>\n  <div fxLayout=\"row\" fxLayoutAlign=\"space-around center\" style=\"height:100%\">\n    <span></span>\n    <router-outlet></router-outlet>\n  </div>\n  <div fxLayout=\"row\" fxLayoutAlign=\"space-around center\">\n    <footer>\n      <router-outlet name=\"footer\"></router-outlet>\n    </footer>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.someField = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        // Store sidenav to service
    };
    AppComponent.prototype.beforeunloadHandler = function (event) {
        // Gestione dello scarico pagina, compresi i refresh
    };
    return AppComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.Ccm-LoginBody'),
    __metadata("design:type", Boolean)
], AppComponent.prototype, "someField", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:beforeunload', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppComponent.prototype, "beforeunloadHandler", null);
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'body',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DemoMaterialModule */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_guards_auth_guard__ = __webpack_require__("../../../../../src/app/_guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_auth_service__ = __webpack_require__("../../../../../src/app/_services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_header_header_component__ = __webpack_require__("../../../../../src/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_spese_spese_component__ = __webpack_require__("../../../../../src/app/spese/spese.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__spese_spese_list_spese_list_component__ = __webpack_require__("../../../../../src/app/spese/spese-list/spese-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__spese_spese_new_spese_new_component__ = __webpack_require__("../../../../../src/app/spese/spese-new/spese-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_cdk__ = __webpack_require__("../../../cdk/@angular/cdk.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_management_gestione_spese_gestione_spese_component__ = __webpack_require__("../../../../../src/app/management/gestione-spese/gestione-spese.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_app_app_routes_component__ = __webpack_require__("../../../../../src/app/app-routes.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__management_management_component__ = __webpack_require__("../../../../../src/app/management/management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__management_gestione_spese_cost_type_add_cost_type_add_component__ = __webpack_require__("../../../../../src/app/management/gestione-spese/cost-type-add/cost-type-add.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_app_services_spesa_service__ = __webpack_require__("../../../../../src/app/_services/spesa.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__confirmation_dialog_confirmation_dialog_component__ = __webpack_require__("../../../../../src/app/confirmation-dialog/confirmation-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__keys_pipe__ = __webpack_require__("../../../../../src/app/keys.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__management_gestione_utente_gestione_utente_component__ = __webpack_require__("../../../../../src/app/management/gestione-utente/gestione-utente.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_app_services_user_service__ = __webpack_require__("../../../../../src/app/_services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__management_gestione_utente_user_add_user_add_component__ = __webpack_require__("../../../../../src/app/management/gestione-utente/user-add/user-add.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__management_gestione_store_gestione_store_component__ = __webpack_require__("../../../../../src/app/management/gestione-store/gestione-store.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__management_gestione_store_store_add_store_add_component__ = __webpack_require__("../../../../../src/app/management/gestione-store/store-add/store-add.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_app_services_store_service__ = __webpack_require__("../../../../../src/app/_services/store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__edit_dialog_edit_dialog_component__ = __webpack_require__("../../../../../src/app/edit-dialog/edit-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__chiusure_chiusure_component__ = __webpack_require__("../../../../../src/app/chiusure/chiusure.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_app_services_balance_service__ = __webpack_require__("../../../../../src/app/_services/balance.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

































/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
var DemoMaterialModule = (function () {
    function DemoMaterialModule() {
    }
    return DemoMaterialModule;
}());
DemoMaterialModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        exports: [
            __WEBPACK_IMPORTED_MODULE_12__angular_material__["i" /* MdToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_12__angular_material__["b" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_12__angular_material__["f" /* MdIconModule */],
            __WEBPACK_IMPORTED_MODULE_12__angular_material__["h" /* MdMenuModule */],
            __WEBPACK_IMPORTED_MODULE_12__angular_material__["d" /* MdDialogModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
        ]
    })
], DemoMaterialModule);

var AppModule = (function () {
    function AppModule(mdIconRegistry, domSanitizer) {
        this.mdIconRegistry = mdIconRegistry;
        this.domSanitizer = domSanitizer;
        mdIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6_app_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_7_app_home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_8_app_header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_8_app_header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_9_app_spese_spese_component__["a" /* SpeseComponent */],
            __WEBPACK_IMPORTED_MODULE_13__spese_spese_list_spese_list_component__["a" /* SpeseListComponent */],
            __WEBPACK_IMPORTED_MODULE_14__spese_spese_new_spese_new_component__["a" /* SpeseNewComponent */],
            __WEBPACK_IMPORTED_MODULE_16_app_management_gestione_spese_gestione_spese_component__["a" /* GestioneSpeseComponent */],
            __WEBPACK_IMPORTED_MODULE_18__management_management_component__["a" /* ManagementComponent */],
            __WEBPACK_IMPORTED_MODULE_19__management_gestione_spese_cost_type_add_cost_type_add_component__["a" /* CostTypeAddComponent */],
            __WEBPACK_IMPORTED_MODULE_21__confirmation_dialog_confirmation_dialog_component__["a" /* ConfirmationDialog */],
            __WEBPACK_IMPORTED_MODULE_22__keys_pipe__["a" /* KeysPipe */],
            __WEBPACK_IMPORTED_MODULE_23__management_gestione_utente_gestione_utente_component__["a" /* GestioneUtenteComponent */],
            __WEBPACK_IMPORTED_MODULE_25__management_gestione_utente_user_add_user_add_component__["a" /* UserAddComponent */],
            __WEBPACK_IMPORTED_MODULE_26__management_gestione_store_gestione_store_component__["a" /* GestioneStoreComponent */],
            __WEBPACK_IMPORTED_MODULE_27__management_gestione_store_store_add_store_add_component__["a" /* StoreAddComponent */],
            __WEBPACK_IMPORTED_MODULE_29__edit_dialog_edit_dialog_component__["a" /* EditDialogComponent */],
            __WEBPACK_IMPORTED_MODULE_30__chiusure_chiusure_component__["a" /* ChiusureComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_12__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_11__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_http__["HttpModule"],
            DemoMaterialModule,
            __WEBPACK_IMPORTED_MODULE_15__angular_cdk__["l" /* CdkTableModule */],
            __WEBPACK_IMPORTED_MODULE_12__angular_material__["d" /* MdDialogModule */],
            __WEBPACK_IMPORTED_MODULE_17_app_app_routes_component__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_11__angular_forms__["h" /* ReactiveFormsModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4_app_guards_auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_5_app_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_20_app_services_spesa_service__["a" /* SpesaService */],
            __WEBPACK_IMPORTED_MODULE_24_app_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_28_app_services_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_31_app_services_balance_service__["a" /* BalanceService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_14__spese_spese_new_spese_new_component__["a" /* SpeseNewComponent */], __WEBPACK_IMPORTED_MODULE_19__management_gestione_spese_cost_type_add_cost_type_add_component__["a" /* CostTypeAddComponent */], __WEBPACK_IMPORTED_MODULE_25__management_gestione_utente_user_add_user_add_component__["a" /* UserAddComponent */], __WEBPACK_IMPORTED_MODULE_29__edit_dialog_edit_dialog_component__["a" /* EditDialogComponent */], __WEBPACK_IMPORTED_MODULE_21__confirmation_dialog_confirmation_dialog_component__["a" /* ConfirmationDialog */], __WEBPACK_IMPORTED_MODULE_27__management_gestione_store_store_add_store_add_component__["a" /* StoreAddComponent */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_12__angular_material__["g" /* MdIconRegistry */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__angular_material__["g" /* MdIconRegistry */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _b || Object])
], AppModule);

var _a, _b;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/chiusure/chiusure.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/chiusure/chiusure.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div style=\"display: inline-block; text-align: left; width: 100%;\"> -->\n<div class=\"alert alert-danger\">{{message}}</div>\n<md-card class=\"example-card\">\n  <md-card-header>\n    <h1 *ngIf=\"diff>0\">Resoconto tra {{timerMessage}}</h1>\n    <h1 *ngIf=\"diff<0\" style=\"color: red\">Resoconto in ritardo di {{timerMessage}}</h1>\n    <span class=\"span-fill-remaining\"></span>\n    <div class=\"ProceedContainer ng-scope\" *ngIf=\"diff<0\"><button class=\"btn BKHBrandedButton Ccm-Button-Primary\" (click)=\"openEditDialog()\" *ngIf=\"lastBalance?.type!=='Chiusura'\">Aggiungi</button></div>\n  </md-card-header>\n  <md-card-content>\n    <md-card *ngFor=\"let obj of balance\">\n      <md-card-title-group>\n        <md-progress-spinner class=\"example-margin\" [color]=\"spinnerColor\" [mode]=\"spinnerMode\" [value]=\"obj.value\" aria-label=\"100\"></md-progress-spinner>\n        <md-card-title>Resoconto {{obj.type}}</md-card-title>\n        <md-card-subtitle>stato: inserito</md-card-subtitle>\n      </md-card-title-group>\n      <md-card-content class=\"md-content\">\n\n\n        <p><span><i>Resoconto eseguito da:</i></span><span> <strong>{{obj.user.name}} {{obj.user.surname}}</strong></span></p>\n        <p><span>In cassa: </span><span>{{obj.cassa}} &euro;</span></p>\n        <p><span>POS:</span><span> <strong>{{obj.pos}}</strong></span></p>\n        <p><span>Ticket:</span><span> <strong>{{obj.ticket}}</strong></span></p>\n      </md-card-content>\n      <!-- <md-card-actions>\n        <button md-button disabled=\"true\">SEGNALA</button>\n      </md-card-actions> -->\n    </md-card>\n  </md-card-content>\n</md-card>\n<!-- </div> -->\n\n\n<!-- <div style=\"display: inline-block; text-align: left; width: 100%;\">\n  <div class=\"alert alert-danger\">{{message}}</div>\n  <div>\n    <h3>Resoconto</h3>\n    <span class=\"span-fill-remaining\"></span>\n    <div class=\"ProceedContainer ng-scope\"><button class=\"btn BKHBrandedButton Ccm-Button-Primary\" (click)=\"openEditDialog()\">Aggiungi</button></div>\n  </div>\n\n  <md-card *ngFor=\"let obj of balance\">\n    <md-card-title-group>\n      <md-progress-spinner class=\"example-margin\" [color]=\"spinnerColor\" [mode]=\"spinnerMode\" [value]=\"obj.value\"></md-progress-spinner>\n      <md-card-title>Resoconto {{obj.tipo}}</md-card-title>\n      <md-card-subtitle>stato: inserito</md-card-subtitle>\n    </md-card-title-group>\n    <md-card-content class=\"md-content\">\n\n\n      <p><span><i>Resoconto eseguito da:</i></span><span> <strong>{{obj.user.name}} {{obj.user.surname}}</strong></span></p>\n      <p><span>In cassa: </span><span>{{obj.cassa}} &euro;</span></p>\n      <p><span>POS:</span><span>{{obj.pos}}</span></p>\n      <p><span>Ticket:</span><span>{{obj.ticket}}</span></p>\n    </md-card-content>\n    <md-card-actions>\n      <button md-button disabled=\"true\">INSERISCI</button>\n    </md-card-actions>\n  </md-card>\n\n</div> -->\n"

/***/ }),

/***/ "../../../../../src/app/chiusure/chiusure.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChiusureComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_balance_service__ = __webpack_require__("../../../../../src/app/_services/balance.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_entity_Balance__ = __webpack_require__("../../../../../src/app/entity/Balance.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_edit_dialog_edit_dialog_component__ = __webpack_require__("../../../../../src/app/edit-dialog/edit-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChiusureComponent = (function () {
    function ChiusureComponent(_balanceService, dialog) {
        this._balanceService = _balanceService;
        this.dialog = dialog;
        this.spinnerColor = 'normal';
        this.spinnerMode = 'determinate';
        this.usr = JSON.parse(localStorage.getItem('currUser'));
    }
    ChiusureComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getList();
        /* TIMER */
        // this.future = new Date(this.futureString);
        this.$counter = __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].interval(1000).map(function (x) {
            _this.diff = Math.floor((_this.future.getTime() - new Date().getTime()) / 1000);
            return x;
        });
        this.subscription = this.$counter.subscribe(function (x) { return _this.timerMessage = _this.dhms(_this.diff); });
        /* FINE TIMER */
    };
    ChiusureComponent.prototype.getList = function () {
        var _this = this;
        console.log('usr -->' + JSON.stringify(this.usr));
        this._balanceService.getTodayBalanceList(this.usr.store._id)
            .then(function (balance) {
            _this.balance = balance;
            _this.lastBalance = balance[0];
            var oDate = new Date();
            oDate.setMinutes(0);
            oDate.setSeconds(0);
            switch (_this.lastBalance.value) {
                case 25:
                    oDate.setHours(16);
                    break;
                case 50:
                    oDate.setHours(20);
                    break;
                case 75:
                    oDate.setHours(24);
                    break;
                case 100:
                    oDate.setDate(oDate.getDate() + 1);
                    oDate.setHours(12);
                    oDate.setMinutes(0);
                    oDate.setSeconds(0);
                    break;
                default:
                    oDate.setHours(12);
                    _this.future = oDate;
                    break;
            }
            _this.future = oDate;
        })
            .catch(function (err) { return console.log(err); });
    };
    ChiusureComponent.prototype.getPrevCapital = function () {
        var _this = this;
        var date = new Date();
        date.setDate(date.getDate() - 1);
        this._balanceService.getBalanceList(this.usr.store._id, date)
            .then(function (balance) {
            var tmp = balance[0];
            if (tmp) {
                _this.prevCapital = tmp.capital;
            }
        })
            .catch(function (err) { return console.log(err); });
    };
    ChiusureComponent.prototype.openEditDialog = function () {
        /**
         * get Store from db
         */
        var _this = this;
        this.editDialog = this.dialog.open(__WEBPACK_IMPORTED_MODULE_4_app_edit_dialog_edit_dialog_component__["a" /* EditDialogComponent */], {
            disableClose: false
        });
        var balance = new __WEBPACK_IMPORTED_MODULE_2_app_entity_Balance__["a" /* Balance */]();
        balance.giorno = new Date().toString();
        balance.user = this.usr;
        balance.store = this.usr.store;
        /* if (this.lastBalance) {
          balance.type = this.lastBalance.type;
        }else {
          balance.type = BalanceType[25];
        } */
        balance.value = this.lastBalance.value + 25;
        balance.type = __WEBPACK_IMPORTED_MODULE_2_app_entity_Balance__["b" /* BalanceType */][this.lastBalance.value + 25];
        // balance.prevCapital = this.lastBalance.prevCapital;
        this.editDialog.componentInstance.balanceObj = balance;
        this.editDialog.componentInstance.title = 'Aggiungi resoconto';
        this.editDialog.afterClosed().subscribe(function (result) {
            if (result) {
                var tmpBal = _this.editDialog.componentInstance.balanceObj;
                console.log('opeEditDialog result: ' + result);
                _this._balanceService.addBalance(tmpBal)
                    .then(function (value) { return _this.getList(); })
                    .catch(function (err) {
                    console.log(err.message);
                    _this.message = err.message;
                });
            }
            _this.editDialog.componentInstance.balanceObj = null;
            _this.editDialog = null;
            _this.getList();
        });
    };
    ChiusureComponent.prototype.dhms = function (t) {
        var days, hours, minutes, seconds;
        if (t >= 0) {
            days = Math.floor(t / 86400);
            t -= days * 86400;
            hours = Math.floor(t / 3600) % 24;
            t -= hours * 3600;
            minutes = Math.floor(t / 60) % 60;
            t -= minutes * 60;
            seconds = t % 60;
        }
        else {
            days = Math.floor(t / 86400);
            t -= days * 86400;
            hours = Math.floor(t / 3600) % 24;
            t -= hours * 3600;
            hours = 24 - hours;
            minutes = Math.floor(t / 60) % 60;
            t -= minutes * 60;
            minutes = 60 - minutes;
            seconds = t % 60;
            seconds = 60 - seconds;
        }
        return [
            hours + 'h',
            minutes + 'm',
            seconds + 's'
        ].join(' ');
    };
    return ChiusureComponent;
}());
ChiusureComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-chiusure',
        template: __webpack_require__("../../../../../src/app/chiusure/chiusure.component.html"),
        styles: [__webpack_require__("../../../../../src/app/chiusure/chiusure.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_services_balance_service__["a" /* BalanceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_services_balance_service__["a" /* BalanceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_material__["c" /* MdDialog */]) === "function" && _b || Object])
], ChiusureComponent);

var _a, _b;
//# sourceMappingURL=chiusure.component.js.map

/***/ }),

/***/ "../../../../../src/app/confirmation-dialog/confirmation-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 md-dialog-title>Conferma</h1>\n<div md-dialog-content>{{confirmMessage}}</div>\n<div md-dialog-actions>\n  <button md-button style=\"color: #fff;background-color: #7fa372;\" (click)=\"dialogRef.close(true)\">Confermo</button>\n  <button md-button (click)=\"dialogRef.close(false)\">Annulla</button>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/confirmation-dialog/confirmation-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmationDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConfirmationDialog = (function () {
    function ConfirmationDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return ConfirmationDialog;
}());
ConfirmationDialog = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-confirmation-dialog',
        template: __webpack_require__("../../../../../src/app/confirmation-dialog/confirmation-dialog.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MdDialogRef */]) === "function" && _a || Object])
], ConfirmationDialog);

var _a;
//# sourceMappingURL=confirmation-dialog.component.js.map

/***/ }),

/***/ "../../../../../src/app/edit-dialog/edit-dialog.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/edit-dialog/edit-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 md-dialog-title>{{title}}</h1>\n\n\n<!-- STORE EDIT -->\n<div *ngIf=\"storeObj != null\">\n\n\n  <form name=\"form\" (ngSubmit)=\"f.form.valid\" #f=\"ngForm\" novalidate>\n\n    <div md-dialog-content>\n\n      <md-input-container class=\"example-full-width\">\n        <input mdInput [(ngModel)]=\"storeObj.nome\" placeholder=\"Nome\" autocomplete=\"off\" #nome=\"ngModel\" name=\"nome\" required value=\"storeObj.nome\">\n      </md-input-container>\n      <md-input-container class=\"example-full-width\">\n        <input mdInput [(ngModel)]=\"storeObj.indirizzo\" placeholder=\"Indirizzo\" autocomplete=\"off\" #indirizzo=\"ngModel\" name=\"indirizzo\"\n          value=\"storeObj.indirizzo\" required>\n      </md-input-container>\n      <md-input-container class=\"example-full-width\">\n        <input mdInput [(ngModel)]=\"storeObj.piva\" placeholder=\"Partita Iva\" autocomplete=\"off\" #piva=\"ngModel\" name=\"piva\" value=\"storeObj.piva\"\n          required>\n      </md-input-container>\n\n\n      <md-checkbox class=\"example-margin\" #active=\"ngModel\" name=\"active\" [(ngModel)]=\"storeObj.active\" [checked]=\"storeObj.active\">Attivo</md-checkbox>\n\n    </div>\n\n\n\n  </form>\n\n</div>\n\n\n<!-- USER EDIT -->\n<div *ngIf=\"userObj != null\">\n  <form name=\"form\" (ngSubmit)=\"f.form.valid\" novalidate>\n\n    <div md-dialog-content>\n\n      <md-input-container class=\"example-full-width\">\n        <input mdInput [(ngModel)]=\"userObj.name\" placeholder=\"Nome\" autocomplete=\"off\" #name=\"ngModel\" name=\"name\" required>\n      </md-input-container>\n\n      <md-input-container class=\"example-full-width\">\n        <input mdInput [(ngModel)]=\"userObj.surname\" placeholder=\"Cognome\" autocomplete=\"off\" #surname=\"ngModel\" name=\"surname\" required>\n      </md-input-container>\n\n      <md-input-container class=\"example-full-width\">\n        <input mdInput [(ngModel)]=\"userObj.username\" placeholder=\"Username\" autocomplete=\"off\" #username=\"ngModel\" name=\"username\"\n          required>\n      </md-input-container>\n\n      <md-input-container class=\"example-full-width\">\n        <input mdInput [(ngModel)]=\"userObj.password\" type=\"password\" placeholder=\"Password\" autocomplete=\"off\" #password=\"ngModel\"\n          name=\"password\" required>\n      </md-input-container>\n\n      <md-input-container class=\"example-full-width\">\n        <input mdInput [(ngModel)]=\"userObj.email\" placeholder=\"Email\" autocomplete=\"off\" #email=\"ngModel\" name=\"email\" required>\n      </md-input-container>\n\n      <div class=\"example-full-width\">\n        <md-select placeholder=\"Ruolo\" [(ngModel)]=\"userObj.ruolo\" #ruolo=\"ngModel\" name=\"role\" required>\n          <md-option *ngFor=\"let ruolo of roles | keys\" [value]=\"ruolo.value\">\n            {{ruolo.value}}\n          </md-option>\n        </md-select>\n      </div>\n      <span></span>\n      <div class=\"example-full-width\">\n        <md-select placeholder=\"Punto Vendita\" [(ngModel)]=\"userObj.store._id\" #store=\"ngModel\" name=\"store\" required>\n          <md-option *ngFor=\"let store of stores\" [value]=\"store._id\">{{store.nome}}</md-option>\n        </md-select>\n      </div>\n\n\n\n      <md-checkbox class=\"example-margin\" #subCategory=\"ngModel\" name=\"active\" [(ngModel)]=\"userObj.active\" [checked]=\"userObj.active\"\n        [value]=\"userObj.active\">Attivo</md-checkbox>\n\n    </div>\n\n  </form>\n</div>\n\n\n<div *ngIf=\"balanceObj != null\">\n  <form name=\"form\" (ngSubmit)=\"f.form.valid\" novalidate>\n    <div md-dialog-content>\n\n      <md-input-container class=\"example-full-width\">\n        <input mdInput type=\"number\" [(ngModel)]=\"balanceObj.cassa\" placeholder=\"Cassa\" autocomplete=\"off\" #cassa=\"ngModel\" name=\"cassa\"\n          required>\n      </md-input-container>\n      <md-input-container class=\"example-full-width\">\n        <input mdInput type=\"number\" [(ngModel)]=\"balanceObj.pos\" placeholder=\"Pos\" autocomplete=\"off\" #pos=\"ngModel\" name=\"pos\"\n          required>\n      </md-input-container>\n\n      <md-input-container class=\"example-full-width\">\n        <input mdInput type=\"number\" [(ngModel)]=\"balanceObj.ticket\" placeholder=\"Ticket\" autocomplete=\"off\" #ticket=\"ngModel\" name=\"ticket\"\n          required>\n      </md-input-container>\n\n    </div>\n  </form>\n</div>\n\n\n\n<div md-dialog-actions>\n  <button md-button style=\"color: #fff;background-color: #7fa372;\" (click)=\"dialogRef.close(true)\">Confermo</button>\n  <button md-button (click)=\"dialogRef.close(false)\">Annulla</button>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/edit-dialog/edit-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_entity_user__ = __webpack_require__("../../../../../src/app/entity/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_store_service__ = __webpack_require__("../../../../../src/app/_services/store.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditDialogComponent = (function () {
    function EditDialogComponent(_storeService, dialogRef) {
        this._storeService = _storeService;
        this.dialogRef = dialogRef;
        this.title = 'Modifica';
        this.storeObj = null;
        this.userObj = null;
        this.balanceObj = null;
        this.roles = __WEBPACK_IMPORTED_MODULE_2_app_entity_user__["a" /* Ruolo */];
    }
    EditDialogComponent.prototype.ngOnInit = function () {
        this.getActiveStoresList();
    };
    EditDialogComponent.prototype.getActiveStoresList = function () {
        var _this = this;
        this._storeService.getStoreList(true)
            .then(function (stores) { _this.stores = stores; })
            .catch(function (err) { return console.log(err); });
    };
    return EditDialogComponent;
}());
EditDialogComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-edit-dialog',
        template: __webpack_require__("../../../../../src/app/edit-dialog/edit-dialog.component.html"),
        styles: [__webpack_require__("../../../../../src/app/edit-dialog/edit-dialog.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_store_service__["a" /* StoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_store_service__["a" /* StoreService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MdDialogRef */]) === "function" && _b || Object])
], EditDialogComponent);

var _a, _b;
//# sourceMappingURL=edit-dialog.component.js.map

/***/ }),

/***/ "../../../../../src/app/entity/Balance.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Balance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BalanceType; });
var Balance = (function () {
    function Balance() {
        this.giorno = Date.now().toString();
    }
    return Balance;
}());

var BalanceType;
(function (BalanceType) {
    BalanceType[BalanceType["Pranzo"] = 25] = "Pranzo";
    BalanceType[BalanceType["Pomeriggio"] = 50] = "Pomeriggio";
    BalanceType[BalanceType["Cena"] = 75] = "Cena";
    BalanceType[BalanceType["Chiusura"] = 100] = "Chiusura";
})(BalanceType || (BalanceType = {}));
//# sourceMappingURL=Balance.js.map

/***/ }),

/***/ "../../../../../src/app/entity/cost-type.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CostType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CostTypeCategories; });
var CostType = (function () {
    function CostType() {
    }
    return CostType;
}());

var CostTypeCategories;
(function (CostTypeCategories) {
    CostTypeCategories[CostTypeCategories["Food"] = 10] = "Food";
    CostTypeCategories[CostTypeCategories["Delivery"] = 20] = "Delivery";
    CostTypeCategories[CostTypeCategories["Ticket"] = 30] = "Ticket";
    CostTypeCategories[CostTypeCategories["Fatture"] = 100] = "Fatture";
    CostTypeCategories[CostTypeCategories["Manutenzione"] = 120] = "Manutenzione";
    CostTypeCategories[CostTypeCategories["Varie"] = 200] = "Varie";
})(CostTypeCategories || (CostTypeCategories = {}));
//# sourceMappingURL=cost-type.js.map

/***/ }),

/***/ "../../../../../src/app/entity/cost.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cost; });
var Cost = (function () {
    function Cost(descrizione, create_on, update_on) {
        if (descrizione === void 0) { descrizione = ''; }
        if (create_on === void 0) { create_on = Date.now().toString(); }
        if (update_on === void 0) { update_on = Date.now().toString(); }
        this.descrizione = descrizione;
        this.create_on = create_on;
        this.update_on = update_on;
    }
    return Cost;
}());

//# sourceMappingURL=cost.js.map

/***/ }),

/***/ "../../../../../src/app/entity/store.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Store; });
var Store = (function () {
    function Store() {
        this.active = true;
    }
    return Store;
}());

//# sourceMappingURL=store.js.map

/***/ }),

/***/ "../../../../../src/app/entity/user.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return User; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ruolo; });
var User = (function () {
    function User() {
    }
    return User;
}());

// tslint:disable-next-line:one-line
var Ruolo;
(function (Ruolo) {
    Ruolo[Ruolo["Dipendente"] = 100] = "Dipendente";
    Ruolo[Ruolo["StoreManager"] = 50] = "StoreManager";
    Ruolo[Ruolo["Admin"] = 10] = "Admin";
    Ruolo[Ruolo["SuperAdmin"] = 1] = "SuperAdmin";
})(Ruolo || (Ruolo = {}));
//# sourceMappingURL=user.js.map

/***/ }),

/***/ "../../../../../src/app/header/header.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".demo-toolbar {\r\n  padding: 6px;\r\n}\r\n.demo-toolbar-icon {\r\n  padding: 0 14px;\r\n}\r\n\r\n\r\n\r\n.example-header-image {\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/images/Logo.png") + ");\r\n  background-size: cover;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<md-toolbar *ngIf=\"auth.loggedIn()\"  class =\"BrandedBackgroundGradientImage\" style=\"text-align: center; padding: 0 5px;\" >\r\n\r\n\t<!--The whole content below can be removed with the new code.-->\r\n\r\n  <div md-card-avatar class=\"example-header-image\"></div>\r\n\t<h3 style=\"color: white\">{{title}}</h3>\r\n\r\n\t<span class=\"span-fill-remaining\"></span>\r\n\t<button md-button [mdMenuTriggerFor]=\"menu\" style=\"color: white; padding: 0 0px;\" >{{user.name}}<md-icon>more_vert</md-icon></button>\r\n</md-toolbar> <!-- main app container -->\r\n<md-menu #menu=\"mdMenu\" yPosition=\"below\" xPosition=\"after\">\r\n  <!-- <button md-menu-item> -->\r\n      <a md-menu-item routerLink=\"/\" routerLinkActive=\"active\">\r\n      <md-icon class=\"md-18|md-24|md-36|md-48\">home</md-icon>\r\n      Home</a>\r\n  <!-- </button> -->\r\n  <a  md-menu-item routerLink=\"/manage\" routerLinkActive=\"active\">\r\n    <md-icon class=\"md-18|md-24|md-36|md-48\">format_list_bulleted</md-icon>\r\n    Gestione\r\n  </a>\r\n  <button md-menu-item (click)=\"logout()\">\r\n    <md-icon class=\"md-18|md-24|md-36|md-48\">exit_to_app</md-icon>\r\n    Esci\r\n  </button>\r\n</md-menu>\r\n"

/***/ }),

/***/ "../../../../../src/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt_angular2_jwt__ = __webpack_require__("../../../../angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_auth_service__ = __webpack_require__("../../../../../src/app/_services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HeaderComponent = (function () {
    function HeaderComponent(route, router, auth
        // private localStorage: LocalStorageService,
    ) {
        this.route = route;
        this.router = router;
        this.auth = auth;
        this.title = 'BakeryHouse!';
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_2_angular2_jwt_angular2_jwt__["JwtHelper"]();
        this.user = JSON.parse(localStorage.getItem('currUser'));
        /*  if (localStorage.getItem('token')) {
  
            try {
            this.user = this.jwtHelper.decodeToken(localStorage.getItem('token'))._doc;
            console.log(JSON.stringify(this.user));
            localStorage.setItem('currUser',JSON.stringify(this.user));
            }catch (e) {
              console.error(e);
            }
          }else{
            console.log('Nessun Token')
          } */
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.logout = function () {
        console.log('logout...');
        // remove user from local storage to log user out
        this.auth.logout();
        this.router.navigate(['login']);
    };
    HeaderComponent.prototype.loggedIn = function () {
        this.auth.loggedIn();
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-header',
        template: __webpack_require__("../../../../../src/app/header/header.component.html"),
        styles: [__webpack_require__("../../../../../src/app/header/header.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], HeaderComponent);

var _a, _b, _c;
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n/* div.Ccm-MainContentView {\r\n    height: 100%;\r\n    min-height: 100%;\r\n}\r\n\r\n.Ccm-MainContent .Ccm-MainContentView {\r\n    height: 100%;\r\n    min-height: 100%;\r\n    overflow: auto;\r\n    -webkit-overflow-scrolling: touch;\r\n} */\r\n\r\n.mat-ink-bar #tabSpese {\r\n  position: absolute;\r\n  bottom: 0;\r\n  height: 4px;\r\n  transition: .5s cubic-bezier(.35,0,.25,1);\r\n  background-color: #7fa372;\r\n}\r\n\r\n\r\n.mat-menu-item {\r\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\r\n  font-size: 14px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n        <div class=\"Ccm-MainContentView ng-scope\">\n               <md-tab-group style=\"font-size:12px\">\n                  <md-tab id=\"tabSpese\" label=\"Spese\">\n                    <app-spese></app-spese>\n                  </md-tab>\n                  <md-tab id=\"tabChiusure\" label=\"Chiusure\">\n                    <app-chiusure></app-chiusure>\n                  </md-tab>\n                </md-tab-group>\n\n        </div>\n\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__("../../../../angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent() {
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["JwtHelper"]();
        this.title = 'BakeryHouse Mgmt';
        if (localStorage.getItem('token')) {
            try {
                this.user = this.jwtHelper.decodeToken(localStorage.getItem('token')).data;
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/keys.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var enumMember in value) {
            if (!isNaN(parseInt(enumMember, 10))) {
                keys.push({ key: enumMember, value: value[enumMember] });
                // Uncomment if you want log
                // console.log("enum member: ", value[enumMember]);
            }
        }
        return keys;
    };
    return KeysPipe;
}());
KeysPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'keys'
    })
], KeysPipe);

//# sourceMappingURL=keys.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"Ccm-MainContent ng-scope Ccm-LoginMainContent\">\n\n\n  <div class=\"Ccm-LoginContainer\">\n\n    <div class=\"Ccm-LoginImage\"><img alt=\"LOGO\" src=\"./assets/images/Logo.png\"></div>\n\n\n    <form name=\"form\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>\n      <div class=\"LoginHelpContainer ng-scope\">\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\n          <div class=\"Ccm-Login-UserNameContainer\">\n            <!-- <md-icon>person</md-icon> -->\n            <span><md-icon>person</md-icon></span>\n            <input class=\"Ccm-SearchField ng-valid ng-not-empty ng-dirty ng-valid-parse ng-touched\" [(ngModel)]=\"model.username\" placeholder=\"Nome Utente\"\n              autocomplete=\"on\" #username=\"ngModel\" name=\"username\" required>\n            <div *ngIf=\"f.submitted && !username.valid\" class=\"help-block\">Username &eacute; obbligatorio</div>\n          </div>\n        </div>\n\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\n\n          <div class=\"Ccm-Login-PasswordContainer\">\n            <span><md-icon>lock</md-icon></span>\n            <input id=\"Password\" type=\"password\" class=\"Ccm-SearchField ng-valid ng-not-empty ng-dirty ng-valid-parse ng-touched\" [(ngModel)]=\"model.password\"\n              placeholder=\"Password\" #password=\"ngModel\" name=\"password\" required>\n            <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password &eacute; obbligatorio</div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <div class=\"ProceedContainer ng-scope\">\n\n          <button [disabled]=\"loading\" class=\"btn btn-primary Ccm-Button-Primary btn btn-default BrandedBackgroundGradientImage LoginButton ng-binding\">Accedi</button>\n        </div>\n\n        <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"\n        />\n      </div>\n      <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n    </form>\n  </div>\n\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__("../../../../../src/app/_services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(route, router, authenticationService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.model = {};
        this.loading = false;
        this.error = '';
        this.LOGO = './img/Logo.png';
        this.someField = true;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(function (result) {
            if (result === true) {
                _this.router.navigate(['/']);
            }
            else {
                _this.error = 'Username or password is incorrect';
                _this.loading = false;
            }
        });
    };
    return LoginComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.Ccm-LoginBody'),
    __metadata("design:type", Boolean)
], LoginComponent.prototype, "someField", void 0);
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'body',
        template: __webpack_require__("../../../../../src/app/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], LoginComponent);

var _a, _b, _c;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/management/gestione-spese/cost-type-add/cost-type-add.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".example-full-width {\r\n  width: 100%;\r\n}\r\n\r\n.example-form {\r\n  width: 500px;\r\n}\r\n\r\nmd-select {\r\n  /* display: inline-block;\r\n  /margin-top: 2px; */\r\n  width: 100%;\r\n  padding-bottom: 26px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/management/gestione-spese/cost-type-add/cost-type-add.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 md-dialog-title>\n  Aggiungi</h3>\n<form name=\"form\" (ngSubmit)=\"f.form.valid && create()\" #f=\"ngForm\" novalidate>\n\n  <div md-dialog-content>\n\n    <md-select placeholder=\"Categoria\" [(ngModel)]=\"costType.nome\" #nome=\"ngModel\" name=\"nome\" required>\n      <md-option *ngFor=\"let types of categoryTypes | keys\" [value]=\"types.value\">\n        {{types.value}}\n      </md-option>\n    </md-select>\n\n\n\n    <md-input-container class=\"example-full-width\" >\n      <input mdInput [(ngModel)]=\"costType.subCategory\" placeholder=\"descrizione\" autocomplete=\"off\" #subCategory=\"ngModel\" name=\"subCategory\" [disabled]= \"!(costType.nome=='Delivery' || costType.nome=='Food')\">\n\n    </md-input-container>\n\n\n    <md-checkbox class=\"example-margin\" #subCategory=\"ngModel\" name=\"hasDescription\" [(ngModel)]=\"costType.hasDescription\" [checked]=\"costType.nome=='Delivery'\" [value]=\"costType.nome=='Delivery'\" >con descrizione</md-checkbox>\n\n    <md-checkbox class=\"example-margin\" #subCategory=\"ngModel\" name=\"attiva\" [(ngModel)]=\"costType.active\" [value]=\"true\" [checked]=\"true\">attivo</md-checkbox>\n\n\n  </div>\n  <div md-dialog-actions>\n    <div class=\"ProceedContainer ng-scope\">\n      <button md-dialog-close=\"cancel\" class=\"btn BKHBrandedButton Ccm-Button-Primary\">Annulla</button>\n    </div>\n    <span class=\"span-fill-remaining\"></span>\n    <div class=\"ProceedContainer ng-scope\">\n      <button [disabled]=\"loading\" class=\"btn BKHBrandedButton Ccm-Button-Primary\">Aggiungi</button>\n    </div>\n    <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"\n    />\n  </div>\n\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/management/gestione-spese/cost-type-add/cost-type-add.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CostTypeAddComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_entity_cost_type__ = __webpack_require__("../../../../../src/app/entity/cost-type.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_spesa_service__ = __webpack_require__("../../../../../src/app/_services/spesa.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CostTypeAddComponent = (function () {
    function CostTypeAddComponent(_spesaService, dialogRef) {
        this._spesaService = _spesaService;
        this.dialogRef = dialogRef;
        this.loading = false;
        this.costType = new __WEBPACK_IMPORTED_MODULE_1_app_entity_cost_type__["a" /* CostType */]();
        this.categoryTypes = __WEBPACK_IMPORTED_MODULE_1_app_entity_cost_type__["b" /* CostTypeCategories */];
    }
    Object.defineProperty(CostTypeAddComponent.prototype, "dropdownType", {
        set: function (value) {
            console.log(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    CostTypeAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._spesaService.getCategoriesList()
            .then(function (cat) { _this.categories = cat; })
            .catch(function (err) { return console.log(err); });
    };
    CostTypeAddComponent.prototype.create = function () {
        //this.loading = true;
        console.log("CREATE " + this.costType.nome);
        // this.createNewSpesaEvent.emit(this.spesa);
        this.dialogRef.close();
        //this.spesa = new Cost();
        //this. loading = false;
    };
    return CostTypeAddComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CostTypeAddComponent.prototype, "dropdownType", null);
CostTypeAddComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/management/gestione-spese/cost-type-add/cost-type-add.component.html"),
        styles: [__webpack_require__("../../../../../src/app/management/gestione-spese/cost-type-add/cost-type-add.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_spesa_service__["a" /* SpesaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_spesa_service__["a" /* SpesaService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MdDialogRef */]) === "function" && _b || Object])
], CostTypeAddComponent);

var _a, _b;
//# sourceMappingURL=cost-type-add.component.js.map

/***/ }),

/***/ "../../../../../src/app/management/gestione-spese/gestione-spese.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"display: inline-block; text-align: left; width: 100%;\">\n  <div class=\"alert alert-danger\">{{message}}</div>\n  <md-card class=\"example-card\">\n    <md-card-header>\n        <h3>Categorie di spesa</h3>\n      <span class=\"span-fill-remaining\"></span>\n      <div class=\"ProceedContainer ng-scope\"><button (click)=\"openDialog()\" class=\"btn BKHBrandedButton Ccm-Button-Primary\">Aggiungi</button></div>\n    </md-card-header>\n    <md-card-content>\n      <div style=\"overflow:auto\">\n        <table class=\"table table-bordered table-striped\">\n          <thead>\n            <tr>\n              <td style=\"text-align : center\"><strong>Categoria</strong></td>\n              <td style=\"text-align : center\"><strong>SottoCategoria</strong></td>\n              <td style=\"text-align : center\"><strong>Descrittivo</strong></td>\n              <td style=\"text-align : center\"><strong>Attivo</strong></td>\n              <td colspan=\"2\"></td>\n\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let cat of costTypes\">\n              <td>{{cat.nome}}</td>\n              <td>{{cat.subCategory}}</td>\n              <td style=\"text-align : center\">\n                <md-icon *ngIf=\"cat.hasDescription==false\">check_box_outline_blank</md-icon>\n                <md-icon *ngIf=\"cat.hasDescription==true\">check_box</md-icon>\n              </td>\n              <td style=\"text-align : center\">\n                <md-icon *ngIf=\"cat.active==false\">check_box_outline_blank</md-icon>\n                <md-icon *ngIf=\"cat.active==true\">check_box</md-icon>\n              </td>\n              <!-- <td style=\"text-align : center; align-items: center; padding: 0px;\">\n                <button md-icon-button><md-icon class=\"md-24\">mode_edit</md-icon></button>\n              </td> -->\n              <td style=\"text-align : center; padding: 0px;\" colspan=\"2\">\n                <button md-icon-button (click)=\"openConfirmationDelete(cat._id)\"><md-icon class=\"md-24\" >delete</md-icon></button>\n              </td>\n\n            </tr>\n\n          </tbody>\n        </table>\n      </div>\n    </md-card-content>\n  </md-card>\n  <div>{{statusMessage}}</div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/management/gestione-spese/gestione-spese.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/management/gestione-spese/gestione-spese.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GestioneSpeseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_management_gestione_spese_cost_type_add_cost_type_add_component__ = __webpack_require__("../../../../../src/app/management/gestione-spese/cost-type-add/cost-type-add.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_spesa_service__ = __webpack_require__("../../../../../src/app/_services/spesa.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_confirmation_dialog_confirmation_dialog_component__ = __webpack_require__("../../../../../src/app/confirmation-dialog/confirmation-dialog.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GestioneSpeseComponent = (function () {
    function GestioneSpeseComponent(_spesaService, dialog) {
        this._spesaService = _spesaService;
        this.dialog = dialog;
    }
    GestioneSpeseComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    GestioneSpeseComponent.prototype.getList = function () {
        var _this = this;
        this._spesaService.getTypeList()
            .then(function (types) { _this.costTypes = types; })
            .catch(function (err) { return console.log(err); });
    };
    GestioneSpeseComponent.prototype.openDialog = function () {
        var _this = this;
        this.message = "";
        this.dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2_app_management_gestione_spese_cost_type_add_cost_type_add_component__["a" /* CostTypeAddComponent */]);
        this.dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result != "cancel") {
                console.log(_this.dialogRef.componentInstance.costType);
                _this.create(_this.dialogRef.componentInstance.costType);
            }
        });
    };
    GestioneSpeseComponent.prototype.closeDialog = function () {
        this.dialog.closeAll();
    };
    GestioneSpeseComponent.prototype.create = function (type) {
        var _this = this;
        console.log("ECCO");
        this._spesaService.addType(type)
            .then(function (data) {
            if (data.success) {
                _this.getList();
            }
            else {
                console.log(data.message);
                _this.message = data.message;
            }
        })
            .catch(function (err) {
            console.log(err);
            _this.statusMessage = err;
        });
        this.closeDialog();
    };
    GestioneSpeseComponent.prototype.openConfirmationDelete = function (id) {
        var _this = this;
        this.confirmDialog = this.dialog.open(__WEBPACK_IMPORTED_MODULE_4_app_confirmation_dialog_confirmation_dialog_component__["a" /* ConfirmationDialog */], {
            disableClose: false
        });
        this.confirmDialog.componentInstance.confirmMessage = "Sei sicuro di voler cancellare questo elemento?";
        this.confirmDialog.afterClosed().subscribe(function (result) {
            if (result) {
                console.log("CANCELLA");
                _this._spesaService.deleteCategory(id)
                    .then(function (types) { _this.getList(); })
                    .catch(function (err) { return console.log(err); });
            }
            _this.confirmDialog = null;
        });
    };
    return GestioneSpeseComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('readOnlyTemplate'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"]) === "function" && _a || Object)
], GestioneSpeseComponent.prototype, "readOnlyTemplate", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('editTemplate'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"]) === "function" && _b || Object)
], GestioneSpeseComponent.prototype, "editTemplate", void 0);
GestioneSpeseComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'speseMngmt',
        template: __webpack_require__("../../../../../src/app/management/gestione-spese/gestione-spese.component.html"),
        styles: [__webpack_require__("../../../../../src/app/management/gestione-spese/gestione-spese.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_spesa_service__["a" /* SpesaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_spesa_service__["a" /* SpesaService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */]) === "function" && _d || Object])
], GestioneSpeseComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=gestione-spese.component.js.map

/***/ }),

/***/ "../../../../../src/app/management/gestione-store/gestione-store.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/management/gestione-store/gestione-store.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"display: inline-block; text-align: left; width: 100%;\">\n    <div class=\"alert alert-danger\">{{message}}</div>\n    <md-card class=\"example-card\">\n      <md-card-header>\n          <h3>Punti Vendita</h3>\n        <span class=\"span-fill-remaining\"></span>\n        <div class=\"ProceedContainer\"><button class=\"btn BKHBrandedButton Ccm-Button-Primary\" (click)=\"openDialog()\">Aggiungi</button></div>\n      </md-card-header>\n      <md-card-content>\n        <div style=\"overflow:auto\">\n          <table class=\"table table-bordered table-striped\">\n            <thead>\n              <tr>\n                <td style=\"text-align : center\"><strong>Nome</strong></td>\n                <td style=\"text-align : center\"><strong>Indirizzo</strong></td>\n                <td style=\"text-align : center\"><strong>P.iva</strong></td>\n                <td colspan=\"2\"></td>\n\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let store of stores\">\n                <td>{{store.nome}}</td>\n                <td>{{store.indirizzo}}</td>\n                <td>{{store.piva}}</td>\n\n\n                <td style=\"text-align : center; align-items: center; padding: 0px;\">\n                    <button md-icon-button (click)=\"openEditDialog(store)\"><md-icon class=\"md-24\">mode_edit</md-icon></button>\n                  </td>\n                  <td style=\"text-align : center; padding: 0px;\" >\n                    <button md-icon-button (click)=\"openConfirmationDelete(store._id)\"><md-icon class=\"md-24\" >delete</md-icon></button>\n                  </td>\n\n                </tr>\n                <!-- <td style=\"text-align : center; align-items: center; padding: 0px;\">\n                  <button md-icon-button><md-icon class=\"md-24\">mode_edit</md-icon></button>\n                </td>\n                <td style=\"text-align : center; padding: 0px;\" colspan=\"2\">\n                  <button md-icon-button (click)=\"openConfirmationDelete(cat._id)\"><md-icon class=\"md-24\" >delete</md-icon></button>\n                </td>\n\n              </tr> -->\n\n            </tbody>\n          </table>\n        </div>\n      </md-card-content>\n    </md-card>\n    <div>{{statusMessage}}</div>\n  </div>\n"

/***/ }),

/***/ "../../../../../src/app/management/gestione-store/gestione-store.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GestioneStoreComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_store_service__ = __webpack_require__("../../../../../src/app/_services/store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_management_gestione_store_store_add_store_add_component__ = __webpack_require__("../../../../../src/app/management/gestione-store/store-add/store-add.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_edit_dialog_edit_dialog_component__ = __webpack_require__("../../../../../src/app/edit-dialog/edit-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_confirmation_dialog_confirmation_dialog_component__ = __webpack_require__("../../../../../src/app/confirmation-dialog/confirmation-dialog.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GestioneStoreComponent = (function () {
    function GestioneStoreComponent(_storeService, dialog) {
        this._storeService = _storeService;
        this.dialog = dialog;
        // constant for swipe action: left or right
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
    }
    GestioneStoreComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    GestioneStoreComponent.prototype.getList = function () {
        var _this = this;
        this._storeService.getStoreList(false)
            .then(function (stores) { _this.stores = stores; })
            .catch(function (err) { return console.log(err); });
    };
    GestioneStoreComponent.prototype.openDialog = function () {
        var _this = this;
        this.message = "";
        this.dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2_app_management_gestione_store_store_add_store_add_component__["a" /* StoreAddComponent */]);
        this.dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result != "cancel") {
                _this.create(_this.dialogRef.componentInstance.store);
                _this.getList();
            }
        });
    };
    GestioneStoreComponent.prototype.create = function (store) {
        this._storeService.addStore(store);
    };
    GestioneStoreComponent.prototype.openEditDialog = function (store) {
        var _this = this;
        /**
         * get Store from db
         */
        console.log("STORE ID TO MOD ==>" + JSON.stringify(store));
        this.editDialog = this.dialog.open(__WEBPACK_IMPORTED_MODULE_4_app_edit_dialog_edit_dialog_component__["a" /* EditDialogComponent */], {
            disableClose: false
        });
        this.editDialog.componentInstance.storeObj = store;
        this.editDialog.afterClosed().subscribe(function (result) {
            if (result) {
                console.log("opeEditDialog result: " + result);
                _this._storeService.updateStore(_this.editDialog.componentInstance.storeObj);
                _this.getList();
            }
            _this.editDialog = null;
        });
    };
    GestioneStoreComponent.prototype.openConfirmationDelete = function (id) {
        var _this = this;
        this.confirmDialog = this.dialog.open(__WEBPACK_IMPORTED_MODULE_5_app_confirmation_dialog_confirmation_dialog_component__["a" /* ConfirmationDialog */], {
            disableClose: false
        });
        this.confirmDialog.componentInstance.confirmMessage = "Sei sicuro di voler cancellare questo elemento?";
        this.confirmDialog.afterClosed().subscribe(function (result) {
            if (result) {
                _this._storeService.delete(id)
                    .then(function (types) { _this.getList(); })
                    .catch(function (err) { return console.log(err); });
            }
            _this.confirmDialog = null;
        });
    };
    return GestioneStoreComponent;
}());
GestioneStoreComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'storeMngmt',
        template: __webpack_require__("../../../../../src/app/management/gestione-store/gestione-store.component.html"),
        styles: [__webpack_require__("../../../../../src/app/management/gestione-store/gestione-store.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_services_store_service__["a" /* StoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_services_store_service__["a" /* StoreService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_material__["c" /* MdDialog */]) === "function" && _b || Object])
], GestioneStoreComponent);

var _a, _b;
//# sourceMappingURL=gestione-store.component.js.map

/***/ }),

/***/ "../../../../../src/app/management/gestione-store/store-add/store-add.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".example-full-width {\r\n  width: 100%;\r\n}\r\n\r\n.example-form {\r\n  width: 500px;\r\n}\r\n\r\nmd-select {\r\n  /* display: inline-block;\r\n  /margin-top: 2px; */\r\n  width: 100%;\r\n  padding-bottom: 26px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/management/gestione-store/store-add/store-add.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 md-dialog-title>\n    Aggiungi</h3>\n  <form name=\"form\" (ngSubmit)=\"f.form.valid && create()\" #f=\"ngForm\" novalidate>\n\n    <div md-dialog-content>\n\n      <md-input-container class=\"example-full-width\">\n        <input mdInput [(ngModel)]=\"store.nome\" placeholder=\"Nome\" autocomplete=\"off\" #nome=\"ngModel\" name=\"nome\" required>\n      </md-input-container>\n      <md-input-container class=\"example-full-width\">\n        <input mdInput [(ngModel)]=\"store.indirizzo\" placeholder=\"Indirizzo\" autocomplete=\"off\" #indirizzo=\"ngModel\" name=\"indirizzo\"\n          required>\n      </md-input-container>\n      <md-input-container class=\"example-full-width\">\n          <input mdInput [(ngModel)]=\"store.piva\" placeholder=\"Partita Iva\" autocomplete=\"off\" #piva=\"ngModel\" name=\"piva\" required>\n        </md-input-container>\n\n\n      <md-checkbox class=\"example-margin\" #active=\"ngModel\" name=\"active\" [(ngModel)]=\"store\" >Attivo</md-checkbox>\n\n\n    </div>\n    <div md-dialog-actions>\n      <div class=\"ProceedContainer ng-scope\">\n        <button md-dialog-close=\"cancel\" class=\"btn BKHBrandedButton Ccm-Button-Primary\">Annulla</button>\n      </div>\n      <span class=\"span-fill-remaining\"></span>\n      <div class=\"ProceedContainer ng-scope\">\n        <button class=\"btn BKHBrandedButton Ccm-Button-Primary\">Aggiungi</button>\n      </div>\n\n    </div>\n\n  </form>\n"

/***/ }),

/***/ "../../../../../src/app/management/gestione-store/store-add/store-add.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreAddComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_entity_store__ = __webpack_require__("../../../../../src/app/entity/store.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StoreAddComponent = (function () {
    function StoreAddComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.store = new __WEBPACK_IMPORTED_MODULE_1_app_entity_store__["a" /* Store */]();
    }
    StoreAddComponent.prototype.ngOnInit = function () {
    };
    StoreAddComponent.prototype.create = function () {
        console.log(this + "=" + JSON.stringify(this.store));
        this.dialogRef.close();
    };
    ;
    return StoreAddComponent;
}());
StoreAddComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-store-add',
        template: __webpack_require__("../../../../../src/app/management/gestione-store/store-add/store-add.component.html"),
        styles: [__webpack_require__("../../../../../src/app/management/gestione-store/store-add/store-add.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MdDialogRef */]) === "function" && _a || Object])
], StoreAddComponent);

var _a;
//# sourceMappingURL=store-add.component.js.map

/***/ }),

/***/ "../../../../../src/app/management/gestione-utente/gestione-utente.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/management/gestione-utente/gestione-utente.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"display: inline-block; text-align: left; width: 100%;\">\n    <div class=\"alert alert-danger\">{{message}}</div>\n    <md-card class=\"example-card\">\n      <md-card-header>\n          <h3>Utenti</h3>\n        <span class=\"span-fill-remaining\"></span>\n        <div class=\"ProceedContainer ng-scope\"><button class=\"btn BKHBrandedButton Ccm-Button-Primary\" (click)=\"openDialog()\">Aggiungi</button></div>\n      </md-card-header>\n      <md-card-content>\n        <div style=\"overflow:auto\">\n          <table class=\"table table-bordered table-striped\">\n            <thead>\n              <tr>\n                <td style=\"text-align : center\"><strong>User ID</strong></td>\n                <td style=\"text-align : center\"><strong>Nome</strong></td>\n                <td style=\"text-align : center\"><strong>Cognome</strong></td>\n                <td style=\"text-align : center\"><strong>Ruolo</strong></td>\n                <td style=\"text-align : center\"><strong>e-mail</strong></td>\n                <td style=\"text-align : center\"><strong>Punto Vendita</strong></td>\n                <td colspan=\"2\"></td>\n\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let user of users\">\n                <td>{{user.username}}</td>\n                <td>{{user.name}}</td>\n                <td>{{user.surname}}</td>\n                <td>{{user.ruolo}}</td>\n                <td>{{user.email}}</td>\n                <td>{{user.store.nome}}</td>\n\n                <td style=\"text-align : center; align-items: center; padding: 0px;\">\n                    <button md-icon-button (click)=\"openEditDialog(user)\"><md-icon class=\"md-24\">mode_edit</md-icon></button>\n                  </td>\n                  <td style=\"text-align : center; padding: 0px;\" >\n                    <button md-icon-button (click)=\"openConfirmationDelete(user._id)\"><md-icon class=\"md-24\" >delete</md-icon></button>\n                  </td>\n\n                </tr>\n                <!-- <td style=\"text-align : center; align-items: center; padding: 0px;\">\n                  <button md-icon-button><md-icon class=\"md-24\">mode_edit</md-icon></button>\n                </td>\n                <td style=\"text-align : center; padding: 0px;\" colspan=\"2\">\n                  <button md-icon-button (click)=\"openConfirmationDelete(cat._id)\"><md-icon class=\"md-24\" >delete</md-icon></button>\n                </td>\n\n              </tr> -->\n\n            </tbody>\n          </table>\n        </div>\n      </md-card-content>\n    </md-card>\n    <div>{{statusMessage}}</div>\n  </div>\n"

/***/ }),

/***/ "../../../../../src/app/management/gestione-utente/gestione-utente.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GestioneUtenteComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_user_service__ = __webpack_require__("../../../../../src/app/_services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_management_gestione_utente_user_add_user_add_component__ = __webpack_require__("../../../../../src/app/management/gestione-utente/user-add/user-add.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_confirmation_dialog_confirmation_dialog_component__ = __webpack_require__("../../../../../src/app/confirmation-dialog/confirmation-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_edit_dialog_edit_dialog_component__ = __webpack_require__("../../../../../src/app/edit-dialog/edit-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_store_service__ = __webpack_require__("../../../../../src/app/_services/store.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var GestioneUtenteComponent = (function () {
    function GestioneUtenteComponent(_storeService, _userService, dialog) {
        this._storeService = _storeService;
        this._userService = _userService;
        this.dialog = dialog;
    }
    GestioneUtenteComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    GestioneUtenteComponent.prototype.getList = function () {
        var _this = this;
        this._userService.getUserList()
            .then(function (users) { _this.users = users; })
            .catch(function (err) { return console.log(err); });
    };
    GestioneUtenteComponent.prototype.create = function (user) {
        this._userService.addUser(user);
    };
    GestioneUtenteComponent.prototype.getActiveStoresList = function () {
        var _this = this;
        this._storeService.getStoreList(true)
            .then(function (stores) { _this.stores = stores; })
            .catch(function (err) { return console.log(err); });
    };
    GestioneUtenteComponent.prototype.openDialog = function () {
        var _this = this;
        this.message = '';
        this.dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_3_app_management_gestione_utente_user_add_user_add_component__["a" /* UserAddComponent */]);
        this.dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result != 'cancel') {
                _this.create(_this.dialogRef.componentInstance.user);
                _this.getList();
            }
        });
    };
    GestioneUtenteComponent.prototype.openConfirmationDelete = function (id) {
        var _this = this;
        this.confirmDialog = this.dialog.open(__WEBPACK_IMPORTED_MODULE_4_app_confirmation_dialog_confirmation_dialog_component__["a" /* ConfirmationDialog */], {
            disableClose: false
        });
        this.confirmDialog.componentInstance.confirmMessage = 'Sei sicuro di voler cancellare questo elemento?';
        this.confirmDialog.afterClosed().subscribe(function (result) {
            if (result) {
                _this._userService.delete(id)
                    .then(function (types) { _this.getList(); })
                    .catch(function (err) { return console.log(err); });
            }
            _this.confirmDialog = null;
        });
    };
    GestioneUtenteComponent.prototype.openEditDialog = function (user) {
        /**
         * get Store from db
         */
        var _this = this;
        this.editDialog = this.dialog.open(__WEBPACK_IMPORTED_MODULE_5_app_edit_dialog_edit_dialog_component__["a" /* EditDialogComponent */], {
            disableClose: false
        });
        this.editDialog.componentInstance.userObj = user;
        this.getActiveStoresList();
        this.editDialog.componentInstance.stores = this.stores;
        this.editDialog.afterClosed().subscribe(function (result) {
            if (result) {
                console.log('opeEditDialog result: ' + result);
                _this._userService.update(_this.editDialog.componentInstance.userObj)
                    .then(function (value) { return _this.getList(); })
                    .catch(function (err) {
                    console.log(err.message);
                    _this.message = err.message;
                });
            }
            _this.editDialog.componentInstance.userObj = null;
            _this.editDialog.componentInstance.stores = null;
            _this.editDialog = null;
        });
    };
    return GestioneUtenteComponent;
}());
GestioneUtenteComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        // tslint:disable-next-line:component-selector
        selector: 'userMngmt',
        template: __webpack_require__("../../../../../src/app/management/gestione-utente/gestione-utente.component.html"),
        styles: [__webpack_require__("../../../../../src/app/management/gestione-utente/gestione-utente.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6_app_services_store_service__["a" /* StoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_app_services_store_service__["a" /* StoreService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_app_services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_services_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MdDialog */]) === "function" && _c || Object])
], GestioneUtenteComponent);

var _a, _b, _c;
//# sourceMappingURL=gestione-utente.component.js.map

/***/ }),

/***/ "../../../../../src/app/management/gestione-utente/user-add/user-add.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".example-full-width {\r\n  width: 100%;\r\n}\r\n\r\n.example-form {\r\n  width: 500px;\r\n}\r\n\r\nmd-select {\r\n  /* display: inline-block;\r\n  /margin-top: 2px; */\r\n  width: 100%;\r\n  padding-bottom: 26px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/management/gestione-utente/user-add/user-add.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 md-dialog-title>\n  Aggiungi</h3>\n<form name=\"form\" (ngSubmit)=\"create()\"  novalidate >\n\n  <div md-dialog-content>\n\n    <md-input-container class=\"example-full-width\">\n      <input mdInput [(ngModel)]=\"user.name\" placeholder=\"Nome\" autocomplete=\"off\" #name=\"ngModel\" name=\"name\" required>\n    </md-input-container>\n\n    <md-input-container class=\"example-full-width\">\n      <input mdInput [(ngModel)]=\"user.surname\" placeholder=\"Cognome\" autocomplete=\"off\" #surname=\"ngModel\" name=\"surname\"\n        required>\n    </md-input-container>\n\n    <md-input-container class=\"example-full-width\">\n      <input mdInput [(ngModel)]=\"user.username\" placeholder=\"Username\" autocomplete=\"off\" #username=\"ngModel\" name=\"username\"\n        required>\n    </md-input-container>\n\n    <md-input-container class=\"example-full-width\">\n        <input mdInput [(ngModel)]=\"user.password\"  type=\"password\" placeholder=\"Password\" autocomplete=\"off\" #password=\"ngModel\" name=\"password\"\n          required>\n      </md-input-container>\n\n    <md-input-container class=\"example-full-width\">\n      <input mdInput [(ngModel)]=\"user.email\"  placeholder=\"Email\" autocomplete=\"off\" name=\"email\" required>\n    </md-input-container>\n\n    <md-select placeholder=\"Ruolo\" [(ngModel)]=\"user.ruolo\" #role=\"ngModel\" name=\"role\" required>\n      <md-option *ngFor=\"let ruolo of ruoli | keys\" [value]=\"ruolo.value\">\n        {{ruolo.value}}\n      </md-option>\n    </md-select>\n\n    <md-select placeholder=\"Punto Vendita\" [(ngModel)]=\"user.store\" #nome=\"ngModel\" name=\"store\" required>\n      <md-option *ngFor=\"let store of stores\" [value]=\"store\">\n        {{store.nome}} - {{store.indirizzo}}\n      </md-option>\n    </md-select>\n\n\n\n\n    <md-checkbox class=\"example-margin\" #subCategory=\"ngModel\" name=\"active\" [(ngModel)]=\"user.active\" [checked]=\"user.active\"\n      [value]=\"user.active\">Attivo</md-checkbox>\n\n\n  </div>\n  <div md-dialog-actions>\n    <div class=\"ProceedContainer ng-scope\">\n      <button md-dialog-close=\"cancel\" class=\"btn BKHBrandedButton Ccm-Button-Primary\">Annulla</button>\n    </div>\n    <span class=\"span-fill-remaining\"></span>\n    <div class=\"ProceedContainer ng-scope\">\n      <button class=\"btn BKHBrandedButton Ccm-Button-Primary\">Aggiungi</button>\n    </div>\n\n  </div>\n\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/management/gestione-utente/user-add/user-add.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserAddComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_entity_user__ = __webpack_require__("../../../../../src/app/entity/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_store_service__ = __webpack_require__("../../../../../src/app/_services/store.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserAddComponent = (function () {
    function UserAddComponent(_storeService, dialogRef) {
        this._storeService = _storeService;
        this.dialogRef = dialogRef;
        this.user = new __WEBPACK_IMPORTED_MODULE_1_app_entity_user__["b" /* User */]();
        this.ruoli = __WEBPACK_IMPORTED_MODULE_1_app_entity_user__["a" /* Ruolo */];
    }
    UserAddComponent.prototype.ngOnInit = function () {
        this.getActiveStoresList();
    };
    UserAddComponent.prototype.getActiveStoresList = function () {
        var _this = this;
        this._storeService.getStoreList(true)
            .then(function (stores) { _this.stores = stores; })
            .catch(function (err) { return console.log(err); });
    };
    UserAddComponent.prototype.create = function () {
        console.log('UserAddComponent=' + JSON.stringify(this.user));
        this.dialogRef.close();
    };
    return UserAddComponent;
}());
UserAddComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/management/gestione-utente/user-add/user-add.component.html"),
        styles: [__webpack_require__("../../../../../src/app/management/gestione-utente/user-add/user-add.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_store_service__["a" /* StoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_store_service__["a" /* StoreService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MdDialogRef */]) === "function" && _b || Object])
], UserAddComponent);

var _a, _b;
//# sourceMappingURL=user-add.component.js.map

/***/ }),

/***/ "../../../../../src/app/management/management.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/management/management.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"Ccm-MainContentView ng-scope\">\n<md-tab-group style=\"font-size:12px\">\n  <md-tab id=\"tabSpeseCat\" label=\"Gestione Spese\">\n    <speseMngmt></speseMngmt>\n  </md-tab>\n  <md-tab label=\"Utenti\">\n      <userMngmt></userMngmt>\n  </md-tab>\n  <md-tab label=\"Punti Vendita\">\n      <storeMngmt></storeMngmt>\n  </md-tab>\n</md-tab-group>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/management/management.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ManagementComponent = (function () {
    function ManagementComponent() {
    }
    ManagementComponent.prototype.ngOnInit = function () {
    };
    return ManagementComponent;
}());
ManagementComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/management/management.component.html"),
        styles: [__webpack_require__("../../../../../src/app/management/management.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ManagementComponent);

//# sourceMappingURL=management.component.js.map

/***/ }),

/***/ "../../../../../src/app/spese/spese-list/spese-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/spese/spese-list/spese-list.component.html":
/***/ (function(module, exports) {

module.exports = "<md-list>\n  <md-list-item *ngFor=\"let spesa of spesaList\">\n    <h4 md-line style=\"text-align: left;\"><strong>{{spesa.descrizione}}</strong></h4>\n    <h6 md-line>({{spesa.tipo.nome}})</h6>\n    <p style=\"font-size: 8px;text-align: left;\" md-line>{{spesa.update_on | date : 'H:mm:ss'}}</p>\n    <div style=\"display: inline-block; text-align: right; width: 100%;\">{{spesa.valore}}&euro;</div>\n    <div style=\"display: inline-block; text-align: right; width: 100%;\">\n      <!-- <md-icon>edit</md-icon> -->\n      <span></span>\n      <button md-icon-button (click)=\"openConfirmationDelete(spesa._id)\"><md-icon class=\"md-24\" >delete</md-icon></button>\n    </div>\n  </md-list-item>\n</md-list>\n"

/***/ }),

/***/ "../../../../../src/app/spese/spese-list/spese-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpeseListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_startWith__ = __webpack_require__("../../../../rxjs/add/operator/startWith.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_merge__ = __webpack_require__("../../../../rxjs/add/observable/merge.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_spesa_service__ = __webpack_require__("../../../../../src/app/_services/spesa.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_confirmation_dialog_confirmation_dialog_component__ = __webpack_require__("../../../../../src/app/confirmation-dialog/confirmation-dialog.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SpeseListComponent = (function () {
    function SpeseListComponent(_spesaService, dialog) {
        this._spesaService = _spesaService;
        this.dialog = dialog;
        this.spesaList = [];
        this.reloadEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SpeseListComponent.prototype.openConfirmationDelete = function (id) {
        var _this = this;
        this.confirmDialog = this.dialog.open(__WEBPACK_IMPORTED_MODULE_6_app_confirmation_dialog_confirmation_dialog_component__["a" /* ConfirmationDialog */], {
            disableClose: false
        });
        this.confirmDialog.componentInstance.confirmMessage = "Sei sicuro di voler cancellare questo elemento?";
        this.confirmDialog.afterClosed().subscribe(function (result) {
            if (result) {
                console.log("CANCELLA");
                _this._spesaService.deleteCost(id)
                    .then(function (types) { _this.reloadEvent.emit(); })
                    .catch(function (err) { return console.log(err); });
            }
            _this.confirmDialog = null;
        });
    };
    return SpeseListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SpeseListComponent.prototype, "spesaList", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SpeseListComponent.prototype, "reloadEvent", void 0);
SpeseListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-spese-list',
        template: __webpack_require__("../../../../../src/app/spese/spese-list/spese-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/spese/spese-list/spese-list.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5_app_services_spesa_service__["a" /* SpesaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_app_services_spesa_service__["a" /* SpesaService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */]) === "function" && _b || Object])
], SpeseListComponent);

var _a, _b;
//# sourceMappingURL=spese-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/spese/spese-new/spese-new.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".example-full-width {\r\n  width: 100%;\r\n}\r\n\r\n.example-form {\r\n  width: 500px;\r\n}\r\n\r\nmd-select {\r\n  /* display: inline-block;\r\n  /margin-top: 2px; */\r\n  width: 100%;\r\n  padding-bottom: 26px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/spese/spese-new/spese-new.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 md-dialog-title>\n  Nuova Spesa</h3>\n<form name=\"form\" (ngSubmit)=\"f.form.valid && create()\" #f=\"ngForm\" novalidate>\n\n  <div md-dialog-content>\n    <md-select placeholder=\"Categoria\" name=\"categoria\" [(ngModel)]=\"tmpCategory\" required (change)=\"getSubCategoryList()\">\n       <md-option *ngFor=\"let types of categoryTypes | keys\" [value]=\"types.value\">\n        {{types.value}}\n      </md-option>\n    </md-select>\n\n    <!-- Sezione Sottocategoria - Visualizzato solo per Delivery e Food -->\n   <!--  <md-select placeholder=\"Tipologia\" [(ngModel)]=\"spesa.tipo\" name=\"tipo\" required *ngIf=\"tmpCategory=='Delivery'\">\n      <md-option *ngFor=\"let types of costTypes\" [value]=\"types\">\n        {{types.subCategory}}\n      </md-option>\n    </md-select> -->\n\n    <md-select placeholder=\"Spesa\" [(ngModel)]=\"spesa.tipo\" name=\"tipo\" required *ngIf=\"tmpCategory=='Food' || tmpCategory=='Delivery'\" (change)=\"setDescription()\">\n        <md-option *ngFor=\"let types of costTypes\" [value]=\"types\">\n          {{types.subCategory}}\n        </md-option>\n      </md-select>\n\n\n\n\n    <md-input-container class=\"example-full-width\" *ngIf=\"tmpCategory!='Food' && tmpCategory!='Delivery'\">\n      <input mdInput placeholder=\"Spesa\" [(ngModel)]=\"spesa.descrizione\" name=\"descrizione\" required>\n      <!-- <md-error *ngIf=\"descrizioneFormControl.hasError('required')\">\n        Campo <strong>obbligatorio</strong>\n      </md-error> -->\n    </md-input-container>\n\n\n    <md-input-container class=\"example-full-width\">\n      <input mdInput [(ngModel)]=\"spesa.valore\" placeholder=\"Valore(€)\" autocomplete=\"off\" #valore=\"ngModel\" name=\"valore\" required>\n      <!-- <md-error *ngIf=\"descrizioneFormControl.hasError('required')\">\n        Campo <strong>obbligatorio</strong>\n      </md-error> -->\n    </md-input-container>\n\n  </div>\n  <div md-dialog-actions>\n    <div class=\"ProceedContainer ng-scope\">\n      <button md-dialog-close=\"cancel\" class=\"btn BKHBrandedButton Ccm-Button-Primary\">Annulla</button>\n    </div>\n    <span class=\"span-fill-remaining\"></span>\n    <div class=\"ProceedContainer ng-scope\">\n      <button [disabled]=\"loading\" class=\"btn BKHBrandedButton Ccm-Button-Primary\">Aggiungi</button>\n    </div>\n    <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"\n    />\n  </div>\n\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/spese/spese-new/spese-new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpeseNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_entity_cost__ = __webpack_require__("../../../../../src/app/entity/cost.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_entity_cost_type__ = __webpack_require__("../../../../../src/app/entity/cost-type.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_spesa_service__ = __webpack_require__("../../../../../src/app/_services/spesa.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SpeseNewComponent = (function () {
    function SpeseNewComponent(_spesaService, dialogRef) {
        this._spesaService = _spesaService;
        this.dialogRef = dialogRef;
        this.descrizioneFormControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["i" /* Validators */].required,
        ]);
        this.categoryTypes = __WEBPACK_IMPORTED_MODULE_4_app_entity_cost_type__["b" /* CostTypeCategories */];
        this.loading = false;
        this.spesa = new __WEBPACK_IMPORTED_MODULE_3_app_entity_cost__["a" /* Cost */]();
        this.createNewSpesaEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SpeseNewComponent.prototype.ngOnInit = function () {
    };
    SpeseNewComponent.prototype.setDescription = function () {
        this.spesa.descrizione = this.spesa.tipo.subCategory;
    };
    SpeseNewComponent.prototype.getSubCategoryList = function () {
        var _this = this;
        this._spesaService.getSubTypeList(this.tmpCategory)
            .then(function (costType) {
            _this.costTypes = costType;
            if ((_this.tmpCategory != 'Food') && (_this.tmpCategory != 'Delivery')) {
                console.log("tmpCategory=" + _this.tmpCategory);
                console.log(JSON.stringify(costType));
                _this.spesa.tipo = costType[0];
            }
        })
            .catch(function (err) { return console.log(err); });
    };
    SpeseNewComponent.prototype.create = function () {
        this.dialogRef.close();
    };
    return SpeseNewComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SpeseNewComponent.prototype, "createNewSpesaEvent", void 0);
SpeseNewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        // selector: 'app-spese-new',
        template: __webpack_require__("../../../../../src/app/spese/spese-new/spese-new.component.html"),
        styles: [__webpack_require__("../../../../../src/app/spese/spese-new/spese-new.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5_app_services_spesa_service__["a" /* SpesaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_app_services_spesa_service__["a" /* SpesaService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MdDialogRef */]) === "function" && _b || Object])
], SpeseNewComponent);

var _a, _b;
//# sourceMappingURL=spese-new.component.js.map

/***/ }),

/***/ "../../../../../src/app/spese/spese.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/spese/spese.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div style=\"display: inline-block; text-align: left; width: 100%;\"> -->\r\n    <div class=\"alert alert-danger\">{{message}}</div>\r\n  <md-card class=\"example-card\">\r\n    <md-card-header>\r\n      <h3>Spese di oggi: {{today | date: 'dd/MM/y'}}</h3>\r\n      <span class=\"span-fill-remaining\"></span>\r\n      <div class=\"ProceedContainer ng-scope\">\r\n        <button (click)=\"openDialog()\" class=\"btn BKHBrandedButton Ccm-Button-Primary \">Aggiungi</button>\r\n      </div>\r\n    </md-card-header>\r\n    <md-card-content>\r\n      <app-spese-list (reloadEvent)=\"getList()\" [spesaList]=\"spesaList\"></app-spese-list>\r\n    </md-card-content>\r\n  </md-card>\r\n<!-- </div> -->\r\n"

/***/ }),

/***/ "../../../../../src/app/spese/spese.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpeseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_spese_spese_new_spese_new_component__ = __webpack_require__("../../../../../src/app/spese/spese-new/spese-new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_spesa_service__ = __webpack_require__("../../../../../src/app/_services/spesa.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SpeseComponent = (function () {
    function SpeseComponent(_spesaService, dialog) {
        this._spesaService = _spesaService;
        this.dialog = dialog;
        this.visible = false;
        this.today = Date.now();
    }
    SpeseComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    SpeseComponent.prototype.getList = function () {
        var _this = this;
        var usr = JSON.parse(localStorage.getItem('currUser'));
        console.log('usr -->' + JSON.stringify(usr));
        this._spesaService.getTodaySpesaList(usr.store._id)
            .then(function (spese) { _this.spesaList = spese; })
            .catch(function (err) { return console.log(err); });
    };
    SpeseComponent.prototype.create = function (spesa) {
        var _this = this;
        // console.log("ECCO");
        var tmpSpesa = spesa;
        var usr = JSON.parse(localStorage.getItem('currUser'));
        this.message = '';
        tmpSpesa.utente = usr;
        tmpSpesa.store = usr.store;
        // console.log("tmpSpesa -->" + JSON.stringify(tmpSpesa));
        this._spesaService.addSpesa(tmpSpesa)
            .then(function (data) {
            if (data.success) {
                _this.getList();
            }
            else {
                console.log(data.message);
                _this.message = data.message;
            }
        })
            .catch(function (err) { return console.log(err); });
        this.closeDialog();
    };
    SpeseComponent.prototype.openDialog = function () {
        var _this = this;
        // this.visible = !this.visible;
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2_app_spese_spese_new_spese_new_component__["a" /* SpeseNewComponent */]);
        dialogRef.afterClosed().subscribe(function (result) {
            // console.log(result);
            if (result !== 'cancel') {
                // console.log(dialogRef.componentInstance.spesa);
                _this.create(dialogRef.componentInstance.spesa);
            }
        });
    };
    SpeseComponent.prototype.closeDialog = function () {
        this.dialog.closeAll();
    };
    return SpeseComponent;
}());
SpeseComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-spese',
        template: __webpack_require__("../../../../../src/app/spese/spese.component.html"),
        styles: [__webpack_require__("../../../../../src/app/spese/spese.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_spesa_service__["a" /* SpesaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_spesa_service__["a" /* SpesaService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */]) === "function" && _b || Object])
], SpeseComponent);

var _a, _b;
//# sourceMappingURL=spese.component.js.map

/***/ }),

/***/ "../../../../../src/assets/images/Logo.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "Logo.61bdb837b1d14c8f1355.png";

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map