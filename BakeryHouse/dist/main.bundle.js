webpackJsonp(["main"],{

/***/ "./src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_gendir lazy recursive";

/***/ }),

/***/ "./src/app/_guards/auth.guard.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_service_1 = __webpack_require__("./src/app/_services/auth.service.ts");
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
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
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], AuthGuard);
exports.AuthGuard = AuthGuard;
var _a, _b;
// export * from './auth.guard';
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "./src/app/_services/alert.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
// tslint:disable-next-line:import-blacklist
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var Rx_1 = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
var AlertService = (function () {
    function AlertService(_http) {
        this._http = _http;
        this.AlertList = new rxjs_1.Subject();
        this.user = JSON.parse(localStorage.getItem('currUser'));
    }
    AlertService.prototype.loadUnreadAlert = function () {
        return this._http.get('api/message/unread/' + this.user._id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); });
    };
    AlertService.prototype.removeMessage = function (mes) {
        return this._http.delete('api/message/' + mes._id).map(function (data) { return data.json(); }).toPromise();
    };
    return AlertService;
}());
AlertService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], AlertService);
exports.AlertService = AlertService;
var _a;
//# sourceMappingURL=alert.service.js.map

/***/ }),

/***/ "./src/app/_services/auth.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var angular2_jwt_1 = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        // public token: string;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
    }
    AuthService.prototype.login = function (uname, pwd) {
        var _this = this;
        return this.http
            .post('api/users/auth', { username: uname, password: pwd })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var jresponse = response.json();
            if (jresponse) {
                if (jresponse.success) {
                    /* console.log(
                      this.jwtHelper.decodeToken(jresponse.token),
                      this.jwtHelper.isTokenExpired(jresponse.token)
                    ); */
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', jresponse.token);
                    var user = _this.jwtHelper.decodeToken(localStorage.getItem('token'))._doc;
                    // console.log(JSON.stringify(user));
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
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        return headers;
    };
    /* Credo ricavi il JWT da localStorage*/
    AuthService.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired('token');
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], AuthService);
exports.AuthService = AuthService;
var _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "./src/app/_services/balance.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var BalanceService = (function () {
    function BalanceService(_http) {
        this._http = _http;
    }
    BalanceService.prototype.getLastBalance = function (store) {
        return this._http.get('api/balance/lastone/' + store._id).map(function (data) { return data.json(); }).toPromise();
    };
    BalanceService.prototype.getTodayBalanceList = function (store) {
        var date = new Date(store.ref_date);
        // console.log('store.ref_date: ' + store.ref_date);
        return this._http.get('api/balance/' + date.getUTCSeconds() + '/' + store._id).map(function (data) { return data.json(); }).toPromise();
    };
    BalanceService.prototype.getBalanceList = function (id_store, date) {
        return this._http.get('api/balance/' + date.getUTCSeconds() + '/' + id_store).map(function (data) { return data.json(); }).toPromise();
    };
    BalanceService.prototype.addBalance = function (balance) {
        // console.log(JSON.stringify(balance));
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('api/balance', balance, options).map(function (data) { return data.json(); }).toPromise();
    };
    return BalanceService;
}());
BalanceService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], BalanceService);
exports.BalanceService = BalanceService;
var _a;
//# sourceMappingURL=balance.service.js.map

/***/ }),

/***/ "./src/app/_services/reports.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var ReportsService = (function () {
    function ReportsService(_http) {
        this._http = _http;
    }
    ReportsService.prototype.getTodayIncidenza = function (id_store) {
        // const today = new Date();
        // today.setHours(0 , 0 - today.getTimezoneOffset(), 0);
        var myHeaders = new http_1.Headers({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        var myParams = new URLSearchParams();
        // myParams.set('store', id_store);
        var options = new http_1.RequestOptions({ headers: myHeaders, params: myParams });
        var sUrl = 'api/report/today';
        sUrl += '?store=' + id_store;
        return this._http
            .get(sUrl, options)
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    return ReportsService;
}());
ReportsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], ReportsService);
exports.ReportsService = ReportsService;
var _a;
//# sourceMappingURL=reports.service.js.map

/***/ }),

/***/ "./src/app/_services/shared.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
// tslint:disable-next-line:import-blacklist
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var SharedService = (function () {
    function SharedService() {
        this.SpesaList = new rxjs_1.Subject();
        this.lastBalance = new rxjs_1.Subject();
    }
    return SharedService;
}());
SharedService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SharedService);
exports.SharedService = SharedService;
//# sourceMappingURL=shared.service.js.map

/***/ }),

/***/ "./src/app/_services/spesa.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
// tslint:disable-next-line:import-blacklist
__webpack_require__("./node_modules/rxjs/Rx.js");
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
        // const today = new Date();
        // today.setHours(0 , 0 - today.getTimezoneOffset(), 0);
        var myHeaders = new http_1.Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
        var myParams = new URLSearchParams();
        // myParams.set('store', id_store);
        var options = new http_1.RequestOptions({ headers: myHeaders, params: myParams });
        var sUrl = 'api/spese/today';
        sUrl += '?store=' + id_store;
        return this._http.get(sUrl, options).map(function (data) { return data.json(); }).toPromise();
    };
    SpesaService.prototype.addSpesa = function (spesa) {
        console.log(JSON.stringify(spesa));
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('api/spese', spesa, options).map(function (data) { return data.json(); }).toPromise();
    };
    SpesaService.prototype.deleteCost = function (id) {
        return this._http.delete('api/spese/' + id).map(function (data) { return data.json(); }).toPromise();
    };
    SpesaService.prototype.updateCost = function (cost) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put('api/spese/' + cost._id, cost, options).map(function (data) { return data.json(); }).toPromise();
    };
    /**
     * COSTTYPE SECTION
     */
    SpesaService.prototype.addType = function (type) {
        console.log(JSON.stringify(type));
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
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
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put('api/costtype/' + cost._id, cost, options).map(function (data) { return data.json(); }).toPromise();
    };
    return SpesaService;
}());
SpesaService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], SpesaService);
exports.SpesaService = SpesaService;
var _a;
//# sourceMappingURL=spesa.service.js.map

/***/ }),

/***/ "./src/app/_services/store.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
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
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('api/stores', store, options).map(function (data) { return data.json(); }).toPromise();
    };
    StoreService.prototype.updateStore = function (store) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put('api/stores/' + store._id, store, options).map(function (data) { return data.json(); }).toPromise();
    };
    StoreService.prototype.delete = function (id) {
        return this._http.delete('api/stores/' + id).map(function (data) { return data.json(); }).toPromise();
    };
    return StoreService;
}());
StoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], StoreService);
exports.StoreService = StoreService;
var _a;
//# sourceMappingURL=store.service.js.map

/***/ }),

/***/ "./src/app/_services/user.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
    }
    UserService.prototype.getUserList = function () {
        return this._http.get('api/users').map(function (data) { return data.json(); }).toPromise();
    };
    UserService.prototype.addUser = function (user) {
        console.log(JSON.stringify(user));
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('api/users', user, options).map(function (data) { return data.json(); }).toPromise();
    };
    UserService.prototype.delete = function (id) {
        return this._http.delete('api/users/' + id).map(function (data) { return data.json(); }).toPromise();
    };
    UserService.prototype.update = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put('api/users/' + user._id, user, options).map(function (data) { return data.json(); }).toPromise();
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], UserService);
exports.UserService = UserService;
var _a;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "./src/app/app-routes.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var login_component_1 = __webpack_require__("./src/app/login/login.component.ts");
var auth_guard_1 = __webpack_require__("./src/app/_guards/auth.guard.ts");
var home_component_1 = __webpack_require__("./src/app/home/home.component.ts");
var management_component_1 = __webpack_require__("./src/app/management/management.component.ts");
var general_report_component_1 = __webpack_require__("./src/app/report/general-report.component.ts");
var logout_component_1 = __webpack_require__("./src/app/logout.component.ts");
var incidenza_report_component_1 = __webpack_require__("./src/app/report/incidenza-report/incidenza-report.component.ts");
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'logout', component: logout_component_1.LogoutComponent },
    { path: '', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    {
        path: 'manage',
        canActivate: [auth_guard_1.AuthGuard],
        component: management_component_1.ManagementComponent,
        children: []
    },
    {
        path: 'report',
        canActivate: [auth_guard_1.AuthGuard],
        component: general_report_component_1.GeneralReportComponent,
        children: [
            { path: 'incidenza', component: incidenza_report_component_1.IncidenzaReportComponent },
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
    core_1.NgModule({
        declarations: [],
        imports: [
            router_1.RouterModule.forRoot(appRoutes, { enableTracing: false } // <-- debugging purposes only
            )
        ],
        providers: [],
        bootstrap: [],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routes.component.js.map

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div fxLayout=\"column\">\r\n  <app-header></app-header>\r\n  <ngx-flash-messages></ngx-flash-messages>\r\n  <router-outlet></router-outlet>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var AppComponent = (function () {
    function AppComponent() {
        this.someField = false;
    }
    /*
      @HostListener('window:beforeunload', ['$event'])
      beforeunloadHandler(event) {x
    
      } */
    AppComponent.prototype.ngOnInit = function () {
        // Store sidenav to service
    };
    return AppComponent;
}());
__decorate([
    core_1.HostBinding('class.Ccm-LoginBody'),
    __metadata("design:type", Object)
], AppComponent.prototype, "someField", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        template: __webpack_require__("./src/app/app.component.html"),
        styles: [__webpack_require__("./src/app/app.component.css")],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
var animations_1 = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser/animations.es5.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var auth_guard_1 = __webpack_require__("./src/app/_guards/auth.guard.ts");
var auth_service_1 = __webpack_require__("./src/app/_services/auth.service.ts");
var login_component_1 = __webpack_require__("./src/app/login/login.component.ts");
var home_component_1 = __webpack_require__("./src/app/home/home.component.ts");
var header_component_1 = __webpack_require__("./src/app/header/header.component.ts");
var spese_component_1 = __webpack_require__("./src/app/spese/spese.component.ts");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
var _1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var _2 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var material_2 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var material_3 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var spese_new_component_1 = __webpack_require__("./src/app/spese/spese-new/spese-new.component.ts");
var table_1 = __webpack_require__("./node_modules/@angular/cdk/esm5/table.es5.js");
var gestione_spese_component_1 = __webpack_require__("./src/app/management/gestione-spese/gestione-spese.component.ts");
var app_routes_component_1 = __webpack_require__("./src/app/app-routes.component.ts");
var management_component_1 = __webpack_require__("./src/app/management/management.component.ts");
var cost_type_add_component_1 = __webpack_require__("./src/app/management/gestione-spese/cost-type-add/cost-type-add.component.ts");
var spesa_service_1 = __webpack_require__("./src/app/_services/spesa.service.ts");
var confirmation_dialog_component_1 = __webpack_require__("./src/app/confirmation-dialog/confirmation-dialog.component.ts");
var keys_pipe_1 = __webpack_require__("./src/app/keys.pipe.ts");
var gestione_utente_component_1 = __webpack_require__("./src/app/management/gestione-utente/gestione-utente.component.ts");
var user_service_1 = __webpack_require__("./src/app/_services/user.service.ts");
var user_add_component_1 = __webpack_require__("./src/app/management/gestione-utente/user-add/user-add.component.ts");
var gestione_store_component_1 = __webpack_require__("./src/app/management/gestione-store/gestione-store.component.ts");
var store_add_component_1 = __webpack_require__("./src/app/management/gestione-store/store-add/store-add.component.ts");
var store_service_1 = __webpack_require__("./src/app/_services/store.service.ts");
var edit_dialog_component_1 = __webpack_require__("./src/app/edit-dialog/edit-dialog.component.ts");
var chiusure_component_1 = __webpack_require__("./src/app/chiusure/chiusure.component.ts");
var balance_service_1 = __webpack_require__("./src/app/_services/balance.service.ts");
var general_report_component_1 = __webpack_require__("./src/app/report/general-report.component.ts");
var devextreme_angular_1 = __webpack_require__("./node_modules/devextreme-angular/index.js");
var flex_layout_1 = __webpack_require__("./node_modules/@angular/flex-layout/index.js");
var logout_component_1 = __webpack_require__("./src/app/logout.component.ts");
var incidenza_report_component_1 = __webpack_require__("./src/app/report/incidenza-report/incidenza-report.component.ts");
var reports_service_1 = __webpack_require__("./src/app/_services/reports.service.ts");
var show_errors_component_1 = __webpack_require__("./src/app/management/gestione-utente/show-error/show-errors.component.ts");
var shared_service_1 = __webpack_require__("./src/app/_services/shared.service.ts");
var alert_service_1 = __webpack_require__("./src/app/_services/alert.service.ts");
var ngx_flash_messages_1 = __webpack_require__("./node_modules/ngx-flash-messages/lib-dist/flash-messages.module.js");
/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
var DemoMaterialModule = (function () {
    function DemoMaterialModule() {
    }
    return DemoMaterialModule;
}());
DemoMaterialModule = __decorate([
    core_1.NgModule({
        exports: [
            _1.MatToolbarModule,
            _1.MatButtonModule,
            _1.MatIconModule,
            material_2.MatMenuModule,
            material_2.MatDialogModule,
            material_1.MatProgressSpinnerModule,
            material_1.MatTabsModule,
            material_2.MatSelectModule,
            material_3.MatInputModule,
            material_3.MatCheckboxModule,
            material_3.MatCardModule,
            material_3.MatFormFieldModule,
            material_3.MatExpansionModule,
            material_1.MatSidenavModule,
            _1.MatChipsModule,
            _1.MatDatepickerModule,
            material_1.MatNativeDateModule,
            _2.MatTooltipModule,
            animations_1.BrowserAnimationsModule,
            _2.MatSnackBarModule
        ],
    })
], DemoMaterialModule);
exports.DemoMaterialModule = DemoMaterialModule;
var AppModule = (function () {
    function AppModule(matIconRegistry, domSanitizer) {
        this.matIconRegistry = matIconRegistry;
        this.domSanitizer = domSanitizer;
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            login_component_1.LoginComponent,
            home_component_1.HomeComponent,
            header_component_1.HeaderComponent,
            header_component_1.HeaderComponent,
            spese_component_1.SpeseComponent,
            spese_new_component_1.SpeseNewComponent,
            gestione_spese_component_1.GestioneSpeseComponent,
            management_component_1.ManagementComponent,
            cost_type_add_component_1.CostTypeAddComponent,
            confirmation_dialog_component_1.ConfirmationDialog,
            keys_pipe_1.KeysPipe,
            gestione_utente_component_1.GestioneUtenteComponent,
            user_add_component_1.UserAddComponent,
            gestione_store_component_1.GestioneStoreComponent,
            store_add_component_1.StoreAddComponent,
            edit_dialog_component_1.EditDialogComponent,
            chiusure_component_1.ChiusureComponent,
            general_report_component_1.GeneralReportComponent,
            incidenza_report_component_1.IncidenzaReportComponent,
            logout_component_1.LogoutComponent,
            show_errors_component_1.ShowErrorsComponent,
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            DemoMaterialModule,
            table_1.CdkTableModule,
            material_2.MatDialogModule,
            app_routes_component_1.AppRoutingModule,
            forms_1.ReactiveFormsModule,
            devextreme_angular_1.DxChartModule,
            devextreme_angular_1.DxDataGridModule,
            flex_layout_1.FlexLayoutModule,
            ngx_flash_messages_1.FlashMessagesModule
        ],
        providers: [
            auth_guard_1.AuthGuard,
            auth_service_1.AuthService,
            spesa_service_1.SpesaService,
            user_service_1.UserService,
            store_service_1.StoreService,
            balance_service_1.BalanceService,
            reports_service_1.ReportsService,
            shared_service_1.SharedService,
            alert_service_1.AlertService,
        ],
        bootstrap: [app_component_1.AppComponent],
        // tslint:disable-next-line:max-line-length
        entryComponents: [spese_new_component_1.SpeseNewComponent, cost_type_add_component_1.CostTypeAddComponent, user_add_component_1.UserAddComponent, edit_dialog_component_1.EditDialogComponent, confirmation_dialog_component_1.ConfirmationDialog, store_add_component_1.StoreAddComponent]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof material_2.MatIconRegistry !== "undefined" && material_2.MatIconRegistry) === "function" && _a || Object, typeof (_b = typeof platform_browser_1.DomSanitizer !== "undefined" && platform_browser_1.DomSanitizer) === "function" && _b || Object])
], AppModule);
exports.AppModule = AppModule;
var _a, _b;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "./src/app/chiusure/chiusure.component.css":
/***/ (function(module, exports) {

module.exports = ".note {\r\n  float:left;\r\n  position: relative;\r\n  width: 100%;\r\n  padding: 1em 1.5em;\r\n  margin: 0.5em auto;\r\n  color: black;\r\n  background: #f0f4ee;\r\n\r\n}\r\n .note:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  border-width: 0 16px 16px 0;\r\n  border-style: solid;\r\n  border-color: #fff #fff #f0f4ee #f0f4ee;\r\n  background: #f0f4ee;\r\n  -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.3), -1px 1px 1px rgba(0,0,0,0.2);\r\n  box-shadow: 0 1px 1px rgba(0,0,0,0.3), -1px 1px 1px rgba(0,0,0,0.2);\r\n\r\n  display: block; width: 0;\r\n}\r\n .note.rounded {\r\n  border-radius: 5px 0 5px 5px;\r\n}\r\n .note.rounded:before {\r\n  border-width: 8px;\r\n  border-color: #fff #fff transparent transparent;\r\n  border-radius: 0 0 0 5px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/chiusure/chiusure.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"overflow-y: hidden;\">\r\n  <div class=\"alert alert-danger\">{{message}}</div>\r\n  <span class=\"span-fill-remaining\"></span>\r\n  <div style=\"float:right;\" class=\"ProceedContainer ng-scope\">\r\n    <button mat-fab (click)=\"openEditDialog()\" color=\"primary\" style=\"color:white\">\r\n      <mat-icon>add</mat-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"note red rounded\" *ngIf=\"lastBalance\">\r\n\r\n      <span style='float:left; background-color: none; text-align: left;'>\r\n        <h3 style=\"text-align: left; font-size: 24px; font-weight: 400; display: block;\r\n        margin-bottom: 16px;\" >\r\n          <strong>Resoconto {{lastBalance.type}}</strong>\r\n        </h3>\r\n        <h6 mat-line class=\"mat-card-subtitle\">data riferimento: {{lastBalance.ref_date | date: 'dd/MM/yyyy'}}</h6>\r\n        <!-- <span style='float:left; background-color: none; text-align: left;'> -->\r\n            <p>\r\n              <span>\r\n                <i>Resoconto eseguito da:</i>\r\n              </span>\r\n              <span>\r\n                <strong>{{lastBalance.user.name}} {{lastBalance.user.surname}}</strong>\r\n              </span>\r\n            </p>\r\n            <p>\r\n              <span>In cassa: </span>\r\n              <span>\r\n                <strong>{{lastBalance.cassa}} &euro;</strong>\r\n              </span>\r\n            </p>\r\n            <p>\r\n              <span>POS:</span>\r\n              <span>\r\n                <strong>{{lastBalance.pos}} &euro;</strong>\r\n              </span>\r\n            </p>\r\n            <p>\r\n              <span>Ticket:</span>\r\n              <span>\r\n                <strong>{{lastBalance.ticket}} &euro;</strong>\r\n              </span>\r\n            </p>\r\n            <p>\r\n              <span>Blu:</span>\r\n              <span>\r\n                <strong>{{lastBalance.rafa}} &euro;</strong>\r\n              </span>\r\n            </p>\r\n\r\n      </span>\r\n      <span style=\"float: right; background-color: none; text-align: right;\">\r\n        <mat-progress-spinner [color]=\"spinnerColor\" [mode]=\"spinnerMode\" [value]=\"lastBalance.value\">0</mat-progress-spinner>\r\n      </span>\r\n\r\n\r\n\r\n\r\n  </div>\r\n\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<!--\r\n<mat-card>\r\n  <mat-card-header>\r\n\r\n    <span class=\"span-fill-remaining\"></span>\r\n    <div style=\"float:right;\" class=\"ProceedContainer ng-scope\">\r\n      <button mat-fab (click)=\"openEditDialog()\" color=\"primary\" style=\"color:white\">\r\n        <mat-icon>add</mat-icon>\r\n      </button>\r\n    </div>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n    <mat-card *ngIf=\"lastBalance\">\r\n      <mat-card-title-group>\r\n        <mat-progress-spinner [color]=\"spinnerColor\" [mode]=\"spinnerMode\" [value]=\"lastBalance.value\">0</mat-progress-spinner>\r\n        <mat-card-title>Resoconto {{lastBalance.type}}</mat-card-title>\r\n        <mat-card-subtitle>data riferimento: {{lastBalance.ref_date | date: 'dd/MM/yyyy'}}</mat-card-subtitle>\r\n      </mat-card-title-group>\r\n      <mat-card-content class=\"md-content\">\r\n\r\n\r\n        <p>\r\n          <span>\r\n            <i>Resoconto eseguito da:</i>\r\n          </span>\r\n          <span>\r\n            <strong>{{lastBalance.user.name}} {{lastBalance.user.surname}}</strong>\r\n          </span>\r\n        </p>\r\n        <p>\r\n          <span>In cassa: </span>\r\n          <span>\r\n            <strong>{{lastBalance.cassa}} &euro;</strong>\r\n          </span>\r\n        </p>\r\n        <p>\r\n          <span>POS:</span>\r\n          <span>\r\n            <strong>{{lastBalance.pos}} &euro;</strong>\r\n          </span>\r\n        </p>\r\n        <p>\r\n          <span>Ticket:</span>\r\n          <span>\r\n            <strong>{{lastBalance.ticket}} &euro;</strong>\r\n          </span>\r\n        </p>\r\n        <p>\r\n          <span>Blu:</span>\r\n          <span>\r\n            <strong>{{lastBalance.rafa}} &euro;</strong>\r\n          </span>\r\n        </p>\r\n      </mat-card-content>\r\n\r\n    </mat-card>\r\n  </mat-card-content>\r\n</mat-card>\r\n -->\r\n"

/***/ }),

/***/ "./src/app/chiusure/chiusure.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var balance_service_1 = __webpack_require__("./src/app/_services/balance.service.ts");
var Balance_1 = __webpack_require__("./src/app/entity/Balance.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var edit_dialog_component_1 = __webpack_require__("./src/app/edit-dialog/edit-dialog.component.ts");
var TimerObservable_1 = __webpack_require__("./node_modules/rxjs/_esm5/observable/TimerObservable.js");
// import { SharedService } from "app/_services/shared.service";
var ChiusureComponent = (function () {
    function ChiusureComponent(_balanceService, 
        /* private sharedService: SharedService,*/
        ref, dialog) {
        this._balanceService = _balanceService;
        this.ref = ref;
        this.dialog = dialog;
        this.spinnerColor = 'normal';
        this.spinnerMode = 'determinate';
        this.alive = true;
        this.usr = JSON.parse(localStorage.getItem('currUser'));
        /* this.sharedService.lastBalance.subscribe(value => {
          this.lastBalance = value;
        }); */
    }
    ChiusureComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getList();
        TimerObservable_1.TimerObservable.create(0, 5000)
            .takeWhile(function () { return _this.alive; })
            .subscribe(function () { return _this.getList(); });
    };
    ChiusureComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    ChiusureComponent.prototype.getList = function () {
        var _this = this;
        this._balanceService
            .getTodayBalanceList(this.usr.store)
            .then(function (balanceDoc) {
            _this.balance = balanceDoc;
            if (balanceDoc.length > 0) {
                // this.sharedService.lastBalance.next(balanceDoc[0]);
                _this.lastBalance = balanceDoc[0];
            }
            else {
                _this._balanceService
                    .getLastBalance(_this.usr.store)
                    .then(function (lastBalanceDoc) {
                    _this.lastBalance = lastBalanceDoc;
                    // this.sharedService.lastBalance.next(lastBalanceDoc);
                });
            }
            _this.ref.detectChanges();
        })
            .catch(function (err) { return console.log(err); });
    };
    ChiusureComponent.prototype.openEditDialog = function () {
        /**
         * get Store from db
         */
        var _this = this;
        this.editDialog = this.dialog.open(edit_dialog_component_1.EditDialogComponent, {
            disableClose: false
        });
        var balance = new Balance_1.Balance();
        balance.ref_date = this.usr.store.ref_date; // new Date().toString();
        balance.user = this.usr;
        balance.store = this.usr.store;
        /* if (this.lastBalance) {
          balance.type = this.lastBalance.type;
        }else {
          balance.type = BalanceType[25];
        } */
        if (this.balance[0]) {
            balance.value = this.balance[0].value + 25;
        }
        else {
            balance.value = 25;
        }
        balance.type = Balance_1.BalanceType[balance.value];
        this.editDialog.componentInstance.balanceObj = balance;
        this.editDialog.componentInstance.title = 'Aggiungi resoconto';
        this.editDialog.afterClosed().subscribe(function (result) {
            if (result) {
                var tmpBal = _this.editDialog.componentInstance.balanceObj;
                console.log('opeEditDialog result: ' + result);
                _this._balanceService
                    .addBalance(tmpBal)
                    .then(function (value) {
                    _this.getList();
                })
                    .catch(function (err) {
                    console.log(err.message);
                    _this.message = err.message;
                });
            }
            _this.editDialog.componentInstance.balanceObj = null;
            _this.editDialog = null;
        });
    };
    return ChiusureComponent;
}());
ChiusureComponent = __decorate([
    core_1.Component({
        selector: 'app-chiusure',
        template: __webpack_require__("./src/app/chiusure/chiusure.component.html"),
        styles: [__webpack_require__("./src/app/chiusure/chiusure.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof balance_service_1.BalanceService !== "undefined" && balance_service_1.BalanceService) === "function" && _a || Object, typeof (_b = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" && _b || Object, typeof (_c = typeof material_1.MatDialog !== "undefined" && material_1.MatDialog) === "function" && _c || Object])
], ChiusureComponent);
exports.ChiusureComponent = ChiusureComponent;
var _a, _b, _c;
//# sourceMappingURL=chiusure.component.js.map

/***/ }),

/***/ "./src/app/confirmation-dialog/confirmation-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Conferma</h1>\r\n<div mat-dialog-content>{{confirmMessage}}</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button style=\"color: #fff;background-color: #7fa372;\" (click)=\"dialogRef.close(true)\">Confermo</button>\r\n  <button mat-button (click)=\"dialogRef.close(false)\">Annulla</button>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/confirmation-dialog/confirmation-dialog.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var ConfirmationDialog = (function () {
    function ConfirmationDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return ConfirmationDialog;
}());
ConfirmationDialog = __decorate([
    core_1.Component({
        selector: 'app-confirmation-dialog',
        template: __webpack_require__("./src/app/confirmation-dialog/confirmation-dialog.component.html")
    })
    // tslint:disable-next-line:component-class-suffix
    ,
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.MatDialogRef !== "undefined" && material_1.MatDialogRef) === "function" && _a || Object])
], ConfirmationDialog);
exports.ConfirmationDialog = ConfirmationDialog;
var _a;
//# sourceMappingURL=confirmation-dialog.component.js.map

/***/ }),

/***/ "./src/app/edit-dialog/edit-dialog.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/edit-dialog/edit-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{title}}</h1>\r\n\r\n\r\n<!-- STORE EDIT -->\r\n<div *ngIf=\"storeObj != null\">\r\n\r\n\r\n  <form name=\"form\" (ngSubmit)=\"f.form.valid\" #f=\"ngForm\" novalidate>\r\n\r\n    <div mat-dialog-content>\r\n\r\n      <mat-form-field>\r\n        <input matInput [(ngModel)]=\"storeObj.nome\" placeholder=\"Nome\" autocomplete=\"off\" #nome=\"ngModel\" name=\"nome\" required value=\"storeObj.nome\">\r\n      </mat-form-field>\r\n      <mat-form-field>\r\n        <input matInput [(ngModel)]=\"storeObj.indirizzo\" placeholder=\"Indirizzo\" autocomplete=\"off\" #indirizzo=\"ngModel\" name=\"indirizzo\"\r\n          value=\"storeObj.indirizzo\" required>\r\n      </mat-form-field>\r\n      <mat-form-field>\r\n        <input matInput [(ngModel)]=\"storeObj.piva\" placeholder=\"Partita Iva\" autocomplete=\"off\" #piva=\"ngModel\" name=\"piva\" value=\"storeObj.piva\"\r\n          required>\r\n      </mat-form-field>\r\n\r\n\r\n      <mat-checkbox class=\"example-margin\" #active=\"ngModel\" name=\"active\" [(ngModel)]=\"storeObj.active\" checked=\"storeObj.active\">Attivo</mat-checkbox>\r\n\r\n    </div>\r\n\r\n\r\n\r\n  </form>\r\n\r\n</div>\r\n\r\n\r\n<!-- USER EDIT -->\r\n<div *ngIf=\"userObj != null\">\r\n  <form name=\"form\" (ngSubmit)=\"f.form.valid\" novalidate>\r\n\r\n    <div mat-dialog-content>\r\n\r\n      <mat-form-field>\r\n        <input matInput [(ngModel)]=\"userObj.name\" placeholder=\"Nome\" autocomplete=\"off\" #name=\"ngModel\" name=\"name\" required>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <input matInput [(ngModel)]=\"userObj.surname\" placeholder=\"Cognome\" autocomplete=\"off\" #surname=\"ngModel\" name=\"surname\"\r\n          required>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <input matInput [(ngModel)]=\"userObj.username\" placeholder=\"Username\" autocomplete=\"off\" #username=\"ngModel\" name=\"username\"\r\n          required>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <input matInput [(ngModel)]=\"userObj.password\" type=\"password\" placeholder=\"Password\" autocomplete=\"off\" #password=\"ngModel\"\r\n          name=\"password\" required>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <input matInput [(ngModel)]=\"userObj.email\" placeholder=\"Email\" autocomplete=\"off\" #email=\"ngModel\" name=\"email\" required>\r\n      </mat-form-field>\r\n\r\n      <div>\r\n        <mat-select placeholder=\"Ruolo\" [(ngModel)]=\"userObj.ruolo\" #ruolo=\"ngModel\" name=\"role\" required>\r\n          <mat-option *ngFor=\"let ruolo of roles | keys\" value=\"ruolo.value\">\r\n            {{ruolo.value}}\r\n          </mat-option>\r\n        </mat-select>\r\n      </div>\r\n      <span></span>\r\n      <div>\r\n        <mat-select placeholder=\"Punto Vendita\" [(ngModel)]=\"userObj.store._id\" #store=\"ngModel\" name=\"store\" required>\r\n          <mat-option *ngFor=\"let store of stores\" value=\"store._id\">{{store.nome}}</mat-option>\r\n        </mat-select>\r\n      </div>\r\n\r\n\r\n\r\n      <mat-checkbox class=\"example-margin\" #subCategory=\"ngModel\" name=\"active\" [(ngModel)]=\"userObj.active\" checked=\"userObj.active\"\r\n        value=\"userObj.active\">Attivo</mat-checkbox>\r\n\r\n    </div>\r\n\r\n  </form>\r\n</div>\r\n\r\n<!-- BALANCE EDIT -->\r\n<div *ngIf=\"balanceObj != null\">\r\n  <form name=\"form\" (ngSubmit)=\"f.form.valid\" novalidate>\r\n    <div mat-dialog-content>\r\n      <mat-expansion-panel>\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title>\r\n            Calcolatrice\r\n          </mat-panel-title>\r\n          <mat-panel-description>\r\n            Inserisci valori per banconote\r\n          </mat-panel-description>\r\n        </mat-expansion-panel-header>\r\n\r\n        <div>\r\n          <mat-form-field *ngFor=\"let item of vItemCurrency\">\r\n            <input matInput type=\"number\" placeholder=\"{{item.multiplier | currency:'EUR':'symbol-narrow':'1.0-2'}}\" autocomplete=\"off\"\r\n              [(ngModel)]=\"item.value\" (change)=\"calculateSum()\" [ngModelOptions]=\"{standalone: true}\">\r\n          </mat-form-field>\r\n\r\n        </div>\r\n      </mat-expansion-panel>\r\n\r\n      <mat-card>\r\n        <mat-card-title>Resoconto</mat-card-title>\r\n        <mat-card-content>\r\n          <div>\r\n            <mat-form-field>\r\n              <input matInput type=\"number\" [(ngModel)]=\"balanceObj.cassa\" placeholder=\"Cassa\" autocomplete=\"off\" #cassa=\"ngModel\" name=\"cassa\"\r\n                required>\r\n            </mat-form-field>\r\n            <mat-form-field>\r\n              <input matInput type=\"number\" [(ngModel)]=\"balanceObj.pos\" placeholder=\"Pos\" autocomplete=\"off\" #pos=\"ngModel\" name=\"pos\"\r\n                required>\r\n            </mat-form-field>\r\n\r\n            <mat-form-field>\r\n              <input matInput type=\"number\" [(ngModel)]=\"balanceObj.ticket\" placeholder=\"Ticket\" autocomplete=\"off\" #ticket=\"ngModel\" name=\"ticket\"\r\n                required>\r\n            </mat-form-field>\r\n            <mat-form-field>\r\n              <input matInput type=\"number\" [(ngModel)]=\"balanceObj.flash\" placeholder=\"Flash\" autocomplete=\"off\" #flash=\"ngModel\" name=\"flash\"\r\n                required>\r\n            </mat-form-field>\r\n          </div>\r\n          <div>\r\n            <mat-form-field *ngIf=\"balanceObj.value === 100\">\r\n              <input matInput type=\"number\" [(ngModel)]=\"balanceObj.capital\" placeholder=\"Fondo Cassa\" autocomplete=\"off\" #flash=\"ngModel\"\r\n                name=\"capital\" required>\r\n            </mat-form-field>\r\n            <mat-form-field>\r\n              <input matInput type=\"number\" [(ngModel)]=\"balanceObj.riserva\" placeholder=\"Riserva Monete\" autocomplete=\"off\" #riserva=\"ngModel\"\r\n                name=\"riserva\">\r\n            </mat-form-field>\r\n            <!-- <mat-form-field>\r\n              <input matInput type=\"number\" [(ngModel)]=\"balanceObj.preconti\" placeholder=\"Preconti\" autocomplete=\"off\" #preconti=\"ngModel\"\r\n                name=\"preconti\">\r\n            </mat-form-field> -->\r\n            <!-- Non deve comparire nella Chiusura -->\r\n            <mat-form-field *ngIf=\"balanceObj.value < 100\">\r\n              <input matInput type=\"number\" [(ngModel)]=\"balanceObj.tavoliAperti\" placeholder=\"Tavoli Aperti\" autocomplete=\"off\" #tavoliAperti=\"ngModel\"\r\n                name=\"tavoliAperti\">\r\n            </mat-form-field>\r\n          </div>\r\n        </mat-card-content>\r\n      </mat-card>\r\n    </div>\r\n  </form>\r\n</div>\r\n\r\n\r\n<div mat-dialog-actions>\r\n  <button mat-button style=\"color: #fff;background-color: #7fa372;\" (click)=\"dialogRef.close(true)\">Confermo</button>\r\n  <button mat-button (click)=\"dialogRef.close(false)\">Annulla</button>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/edit-dialog/edit-dialog.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var user_1 = __webpack_require__("./src/app/entity/user.ts");
var store_service_1 = __webpack_require__("./src/app/_services/store.service.ts");
var EditDialogComponent = (function () {
    function EditDialogComponent(_storeService, dialogRef, data) {
        this._storeService = _storeService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.title = 'Modifica';
        // tslint:disable-next-line:max-line-length
        this.vItemCurrency = [{ value: 0, multiplier: 100 }, { value: 0, multiplier: 50 }, { value: 0, multiplier: 20 }, { value: 0, multiplier: 10 }, { value: 0, multiplier: 5 },
            { value: 0, multiplier: 2 }, { value: 0, multiplier: 1 }, { value: 0, multiplier: 0.5 }, { value: 0, multiplier: 0.20 }, { value: 0, multiplier: 0.10 }];
        this.storeObj = null;
        this.userObj = null;
        this.balanceObj = null;
        this.roles = user_1.Ruolo;
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
    /* calculateSum(val: any) {
      this.balanceObj.cassa += +val;
    } */
    EditDialogComponent.prototype.calculateSum = function () {
        this.balanceObj.cassa = 0;
        for (var j = 0; j < this.vItemCurrency.length; j++) {
            this.balanceObj.cassa += this.vItemCurrency[j].value * this.vItemCurrency[j].multiplier;
        }
    };
    return EditDialogComponent;
}());
EditDialogComponent = __decorate([
    core_1.Component({
        selector: 'app-edit-dialog',
        template: __webpack_require__("./src/app/edit-dialog/edit-dialog.component.html"),
        styles: [__webpack_require__("./src/app/edit-dialog/edit-dialog.component.css")]
    }),
    __param(2, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [typeof (_a = typeof store_service_1.StoreService !== "undefined" && store_service_1.StoreService) === "function" && _a || Object, typeof (_b = typeof material_1.MatDialogRef !== "undefined" && material_1.MatDialogRef) === "function" && _b || Object, Object])
], EditDialogComponent);
exports.EditDialogComponent = EditDialogComponent;
var _a, _b;
//# sourceMappingURL=edit-dialog.component.js.map

/***/ }),

/***/ "./src/app/entity/Balance.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Balance = (function () {
    // tslint:disable-next-line:one-line
    function Balance(cassa) {
        if (cassa === void 0) { cassa = 0; }
        this.cassa = cassa;
        this.create_on = Date.now().toString();
    }
    return Balance;
}());
exports.Balance = Balance;
var BalanceType;
(function (BalanceType) {
    BalanceType[BalanceType["Pranzo"] = 25] = "Pranzo";
    BalanceType[BalanceType["Pomeriggio"] = 50] = "Pomeriggio";
    BalanceType[BalanceType["Cena"] = 75] = "Cena";
    BalanceType[BalanceType["Chiusura"] = 100] = "Chiusura";
})(BalanceType = exports.BalanceType || (exports.BalanceType = {}));
//# sourceMappingURL=Balance.js.map

/***/ }),

/***/ "./src/app/entity/cost-type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CostType = (function () {
    function CostType() {
        this.active = true;
        this.hasDescription = true;
    }
    return CostType;
}());
exports.CostType = CostType;
var CostTypeCategories;
(function (CostTypeCategories) {
    CostTypeCategories[CostTypeCategories["Food"] = 10] = "Food";
    CostTypeCategories[CostTypeCategories["Delivery"] = 20] = "Delivery";
    CostTypeCategories[CostTypeCategories["Ticket"] = 30] = "Ticket";
    CostTypeCategories[CostTypeCategories["Stipendi"] = 100] = "Stipendi";
    CostTypeCategories[CostTypeCategories["Manutenzione"] = 120] = "Manutenzione";
    CostTypeCategories[CostTypeCategories["Utility"] = 140] = "Utility";
    CostTypeCategories[CostTypeCategories["Varie"] = 200] = "Varie";
})(CostTypeCategories = exports.CostTypeCategories || (exports.CostTypeCategories = {}));
//# sourceMappingURL=cost-type.js.map

/***/ }),

/***/ "./src/app/entity/cost.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.Cost = Cost;
//# sourceMappingURL=cost.js.map

/***/ }),

/***/ "./src/app/entity/store.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Store = (function () {
    function Store() {
        this.active = true;
    }
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=store.js.map

/***/ }),

/***/ "./src/app/entity/user.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
// tslint:disable-next-line:one-line
var Ruolo;
(function (Ruolo) {
    Ruolo[Ruolo["Dipendente"] = 100] = "Dipendente";
    Ruolo[Ruolo["StoreManager"] = 50] = "StoreManager";
    Ruolo[Ruolo["Admin"] = 10] = "Admin";
    Ruolo[Ruolo["SuperAdmin"] = 1] = "SuperAdmin";
})(Ruolo = exports.Ruolo || (exports.Ruolo = {}));
//# sourceMappingURL=user.js.map

/***/ }),

/***/ "./src/app/header/header.component.css":
/***/ (function(module, exports) {

module.exports = ".demo-toolbar {\r\n  padding: 6px;\r\n}\r\n.demo-toolbar-icon {\r\n  padding: 0 14px;\r\n}\r\n.example-header-image {\r\n  background-image: url('Logo.61bdb837b1d14c8f1355.png');\r\n  background-size: cover;\r\n}\r\n.notif:before {\r\n  content: \"\\E7F4\";\r\n  font-family: \"Material Icons\";\r\n  display: block;\r\n  position: relative;\r\n  right: 100%;\r\n  font-size: 24px;\r\n  color: rgb(255, 255, 255);\r\n}\r\n.notif {\r\n  position: relative;\r\n  display: block;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n}\r\n.num {\r\n  position: absolute;\r\n  right: 25px;\r\n  top: 5px;\r\n  color: rgb(255, 0, 0);\r\n  cursor: pointer;\r\n  font-weight: bold;\r\n}\r\n.selected {\r\n  background-color: #CFD8DC !important;\r\n  color: white;\r\n}\r\n.bkspeselist{\r\n  margin: 0 0 2em 0;\r\n  list-style-type: none;\r\n  padding: 0;\r\n  width: 15em;\r\n}\r\n.bkspeselist li{\r\n  cursor: pointer;\r\n  position: relative;\r\n  left: 0;\r\n  background-color: #EEE;\r\n  margin: .5em;\r\n  padding: .3em 0;\r\n  height: 2em;\r\n  border-radius: 4px;\r\n\r\n\r\n}\r\n.bkspeselist li.selected:hover {\r\n  background-color: #BBD8DC !important;\r\n  color: white;\r\n}\r\n.bkspeselist li:hover {\r\n  color: #607D8B;\r\n  background-color: #DDD;\r\n  left: .1em;\r\n}\r\n.bkspeselist .text {\r\n  position: relative;\r\n  top: -4px;\r\n  font: 12px arial, sans-serif;\r\n}\r\n.bkspeselist .badge {\r\n  display: inline-block;\r\n  font-size: small;\r\n  color: white;\r\n  padding: 0.8em 0.7em 0 0.7em;\r\n  background-color: rgb(187, 51, 27);\r\n  line-height: 1em;\r\n  position: relative;\r\n  left: -1px;\r\n  top: -4px;\r\n  height: 2.2em;\r\n  margin-right: .8em;\r\n  border-radius: 4px 0 0 4px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<meta http-equiv='cache-control' content='no-cache'>\r\n<meta http-equiv='expires' content='0'>\r\n<meta http-equiv='pragma' content='no-cache'>\r\n<mat-toolbar *ngIf=\"auth.loggedIn()\" class=\"BrandedBackgroundGradientImage\" style=\"text-align: center; padding: 0 5px;\">\r\n\r\n  <!--The whole content below can be removed with the new code.-->\r\n\r\n  <div mat-card-avatar class=\"example-header-image\"></div>\r\n  <h3 style=\"color: white\">{{user.store.nome}}</h3>\r\n\r\n\r\n  <span class=\"span-fill-remaining\"></span>\r\n  <div class=\"notif\" [matMenuTriggerFor]=\"alertMenu\">\r\n    <span class=\"num\" *ngIf=\"alertList.length >0\">{{alertList.length}}</span>\r\n  </div>\r\n  <mat-menu #alertMenu=\"matMenu\">\r\n    <ul class=\"bkspeselist\">\r\n      <li *ngFor=\"let msg of alertList\" (click)=\"openSnackBar(msg, 'letto')\">\r\n        <span class=\"badge\" >-</span><span  class=\"text\">{{msg.subject}}</span>\r\n\r\n    </ul>\r\n  </mat-menu>\r\n\r\n  <button mat-button [matMenuTriggerFor]=\"menu\" style=\"color: white; padding: 0 0px;\">{{user.name}}\r\n    <mat-icon>more_vert</mat-icon>\r\n  </button>\r\n</mat-toolbar>\r\n<!-- main app container -->\r\n\r\n<mat-menu #menu=\"matMenu\" yPosition=\"below\" xPosition=\"after\">\r\n\r\n  <a mat-menu-item routerLink=\"/\" routerLinkActive=\"active\">\r\n    <mat-icon class=\"md-18|md-24|md-36|md-48\">home</mat-icon>\r\n    Home</a>\r\n  <div *ngIf=\"user\">\r\n    <a mat-menu-item routerLink=\"/manage\" routerLinkActive=\"active\" *ngIf=\"user.ruolo !== 'Dipendente'\">\r\n      <mat-icon class=\"md-18|md-24|md-36|md-48\">format_list_bulleted</mat-icon>\r\n      Gestione\r\n    </a>\r\n\r\n    <a mat-menu-item routerLink=\"/report\" routerLinkActive=\"active\" *ngIf=\"user.ruolo !== 'Dipendente'\">\r\n      <mat-icon class=\"md-18|md-24|md-36|md-48\">trending_up</mat-icon>\r\n      Report\r\n    </a>\r\n  </div>\r\n  <!-- <btton mat-menu-item (click)=\"logout()\"> -->\r\n  <a mat-menu-item routerLink=\"/logout\" routerLinkActive=\"active\">\r\n    <mat-icon class=\"md-18|md-24|md-36|md-48\">exit_to_app</mat-icon>\r\n\r\n    Esci\r\n  </a>\r\n  <!-- </button> -->\r\n</mat-menu>\r\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
// import { JwtHelper } from 'angular2-jwt/angular2-jwt';
var auth_service_1 = __webpack_require__("./src/app/_services/auth.service.ts");
var alert_service_1 = __webpack_require__("./src/app/_services/alert.service.ts");
var TimerObservable_1 = __webpack_require__("./node_modules/rxjs/_esm5/observable/TimerObservable.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/takeWhile.js");
var HeaderComponent = (function () {
    // subscription: Subscription;
    // private jwtHelper: JwtHelper = new JwtHelper();
    function HeaderComponent(vc, snackBar, alertService, ref, auth) {
        this.vc = vc;
        this.snackBar = snackBar;
        this.alertService = alertService;
        this.ref = ref;
        this.auth = auth;
        this.alertList = [];
        this.user = JSON.parse(localStorage.getItem('currUser'));
        this.alive = true;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('currUser'));
        TimerObservable_1.TimerObservable.create(0, 5000)
            .takeWhile(function () { return _this.alive; })
            .subscribe(function () { return _this.getAlerts(); });
    };
    HeaderComponent.prototype.ngOnDestroy = function () { this.alive = false; };
    HeaderComponent.prototype.ngDoCheck = function () {
        this.user = JSON.parse(localStorage.getItem('currUser'));
    };
    HeaderComponent.prototype.openSnackBar = function (message, action) {
        var _this = this;
        var snackBarRef = this.snackBar.open(message.message, action, {});
        snackBarRef.onAction().subscribe(function () {
            _this.alertService.removeMessage(message);
            snackBarRef.dismiss();
        });
    };
    HeaderComponent.prototype.getAlerts = function () {
        var _this = this;
        this.alertService.loadUnreadAlert().subscribe(function (value) {
            _this.alertList = value;
            _this.ref.detectChanges();
        });
    };
    HeaderComponent.prototype.loggedIn = function () {
        this.auth.loggedIn();
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'app-header',
        template: __webpack_require__("./src/app/header/header.component.html"),
        styles: [__webpack_require__("./src/app/header/header.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.ViewContainerRef !== "undefined" && core_1.ViewContainerRef) === "function" && _a || Object, typeof (_b = typeof material_1.MatSnackBar !== "undefined" && material_1.MatSnackBar) === "function" && _b || Object, typeof (_c = typeof alert_service_1.AlertService !== "undefined" && alert_service_1.AlertService) === "function" && _c || Object, typeof (_d = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" && _d || Object, typeof (_e = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" && _e || Object])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
var _a, _b, _c, _d, _e;
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "./src/app/home/home.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n div.Ccm-MainContentView {\r\n    height: 100%;\r\n    min-height: 100%;\r\n}\r\n/*\r\n.Ccm-MainContent .Ccm-MainContentView {\r\n    height: 100%;\r\n    min-height: 100%;\r\n    overflow: auto;\r\n    -webkit-overflow-scrolling: touch;\r\n} */\r\n"

/***/ }),

/***/ "./src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-tab-group style=\"font-size:12px; width: 100%\">\r\n  <mat-tab id=\"tabSpese\" label=\"Spese\">\r\n    <app-spese></app-spese>\r\n  </mat-tab>\r\n  <mat-tab id=\"tabChiusure\" label=\"Chiusure\">\r\n    <app-chiusure></app-chiusure>\r\n  </mat-tab>\r\n</mat-tab-group>\r\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var angular2_jwt_1 = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
var ngx_flash_messages_1 = __webpack_require__("./node_modules/ngx-flash-messages/lib-dist/flash-messages.module.js");
var HomeComponent = (function () {
    function HomeComponent(_flashMessagesService) {
        this._flashMessagesService = _flashMessagesService;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
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
    HomeComponent.prototype.ngOnInit = function () {
        /* this._flashMessagesService.show('My component has initialized!', {
          classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
          timeout: 1000, // Default is 3000
        }); */
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        template: __webpack_require__("./src/app/home/home.component.html"),
        styles: [__webpack_require__("./src/app/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof ngx_flash_messages_1.FlashMessagesService !== "undefined" && ngx_flash_messages_1.FlashMessagesService) === "function" && _a || Object])
], HomeComponent);
exports.HomeComponent = HomeComponent;
var _a;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "./src/app/keys.pipe.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
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
    core_1.Pipe({
        name: 'keys'
    })
], KeysPipe);
exports.KeysPipe = KeysPipe;
//# sourceMappingURL=keys.pipe.js.map

/***/ }),

/***/ "./src/app/login/login.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"Ccm-MainContent ng-scope Ccm-LoginMainContent\"> -->\r\n<div class=\"Ccm-MainContent Ccm-LoginMainContent\">\r\n\r\n\r\n  <div class=\"Ccm-LoginContainer\">\r\n\r\n    <div class=\"Ccm-LoginImage\">\r\n      <img alt=\"LOGO\" src=\"./assets/images/Logo.png\">\r\n    </div>\r\n\r\n\r\n    <form name=\"form\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>\r\n      <div class=\"LoginHelpContainer\">\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\r\n          <div class=\"Ccm-Login-UserNameContainer\">\r\n            <!-- <mat-icon>person</mat-icon> -->\r\n            <span>\r\n              <mat-icon>person</mat-icon>\r\n            </span>\r\n            <input class=\"Ccm-SearchField ng-dirty ng-valid-parse ng-touched\" [(ngModel)]=\"model.username\" placeholder=\"Nome Utente\"\r\n              autocomplete=\"off\" #username=\"ngModel\" name=\"username\" required>\r\n            <div *ngIf=\"f.submitted && !username.valid\" class=\"help-block\">Username &eacute; obbligatorio</div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\r\n\r\n          <div class=\"Ccm-Login-PasswordContainer\">\r\n            <span>\r\n              <mat-icon>lock</mat-icon>\r\n            </span>\r\n            <input id=\"Password\" type=\"password\" class=\"Ccm-SearchField ng-valid ng-not-empty ng-dirty ng-valid-parse ng-touched\" [(ngModel)]=\"model.password\"\r\n              placeholder=\"Password\" #password=\"ngModel\" name=\"password\" required>\r\n            <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password &eacute; obbligatorio</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <div class=\"ProceedContainer .Ccm-LoginContainer \">\r\n        <div class=\"form-group\">\r\n          <button [disabled]=\"loading\" class=\" btn BKHBrandedButton Ccm-Button-Primary LoginButton\">Accedi</button>\r\n        </div>\r\n\r\n        <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"\r\n        />\r\n      </div>\r\n      <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\r\n    </form>\r\n  </div>\r\n\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var auth_service_1 = __webpack_require__("./src/app/_services/auth.service.ts");
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
                _this.router.navigate([_this.returnUrl]);
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
    core_1.HostBinding('class.Ccm-LoginBody'),
    __metadata("design:type", Object)
], LoginComponent.prototype, "someField", void 0);
LoginComponent = __decorate([
    core_1.Component({
        // selector: 'app-root',
        template: __webpack_require__("./src/app/login/login.component.html"),
        styles: [__webpack_require__("./src/app/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object, typeof (_c = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" && _c || Object])
], LoginComponent);
exports.LoginComponent = LoginComponent;
var _a, _b, _c;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "./src/app/logout.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var auth_service_1 = __webpack_require__("./src/app/_services/auth.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var LogoutComponent = (function () {
    function LogoutComponent(_authService, router) {
        this._authService = _authService;
        this.router = router;
    }
    LogoutComponent.prototype.ngOnInit = function () {
        this._authService.logout();
        this.router.navigate(['login']);
    };
    return LogoutComponent;
}());
LogoutComponent = __decorate([
    core_1.Component({
        template: ''
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], LogoutComponent);
exports.LogoutComponent = LogoutComponent;
var _a, _b;
//# sourceMappingURL=logout.component.js.map

/***/ }),

/***/ "./src/app/management/gestione-spese/cost-type-add/cost-type-add.component.css":
/***/ (function(module, exports) {

module.exports = ".example-full-width {\r\n  width: 100%;\r\n}\r\n\r\n.example-form {\r\n  width: 500px;\r\n}\r\n\r\nmd-select {\r\n  /* display: inline-block;\r\n  /margin-top: 2px; */\r\n  width: 100%;\r\n  padding-bottom: 26px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/management/gestione-spese/cost-type-add/cost-type-add.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 mat-dialog-title>\r\n  Aggiungi</h3>\r\n<form #costForm=\"ngForm\" (ngSubmit)=\"f.form.valid && create()\" #f=\"ngForm\" novalidate>\r\n\r\n  <div mat-dialog-content>\r\n    <mat-input-container class=\"example-full-width\">\r\n      <mat-select placeholder=\"Categoria\" [(ngModel)]=\"costType.nome\" #nome=\"ngModel\" name=\"nome\" required>\r\n        <mat-option *ngFor=\"let types of categoryTypes | keys\" [value]=\"types.value\">\r\n          {{types.value}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-input-container>\r\n\r\n\r\n    <mat-input-container class=\"example-full-width\">\r\n      <input matInput [(ngModel)]=\"costType.subCategory\" placeholder=\"descrizione\" autocomplete=\"off\" #subCategory=\"ngModel\" name=\"subCategory\"\r\n        [disabled]=\"costType.hasDescription\">\r\n\r\n    </mat-input-container>\r\n\r\n<br>\r\n      <mat-checkbox style=\"float: left\" class=\"example-margin\" #subCategory=\"ngModel\" name=\"hasDescription\" [(ngModel)]=\"costType.hasDescription\">con descrizione</mat-checkbox>\r\n\r\n      <mat-checkbox style=\"float: right\" class=\"example-margin\" #subCategory=\"ngModel\" name=\"attiva\" [(ngModel)]=\"costType.active\">attivo</mat-checkbox>\r\n\r\n\r\n  </div>\r\n  <div mat-dialog-actions>\r\n    <div class=\"ProceedContainer ng-scope\">\r\n      <button mat-dialog-close=\"cancel\" class=\"btn BKHBrandedButton Ccm-Button-Primary\">Annulla</button>\r\n    </div>\r\n    <span class=\"span-fill-remaining\"></span>\r\n    <div class=\"ProceedContainer ng-scope\">\r\n      <button [disabled]=\"loading\" class=\"btn BKHBrandedButton Ccm-Button-Primary\" [disabled]=\"costForm.invalid || costForm.pending\">Aggiungi</button>\r\n    </div>\r\n    <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmatEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fmatgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmatsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"\r\n    />\r\n  </div>\r\n\r\n</form>\r\n"

/***/ }),

/***/ "./src/app/management/gestione-spese/cost-type-add/cost-type-add.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var cost_type_1 = __webpack_require__("./src/app/entity/cost-type.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var spesa_service_1 = __webpack_require__("./src/app/_services/spesa.service.ts");
var CostTypeAddComponent = (function () {
    function CostTypeAddComponent(_spesaService, dialogRef) {
        this._spesaService = _spesaService;
        this.dialogRef = dialogRef;
        this.loading = false;
        this.costType = new cost_type_1.CostType();
        this.categoryTypes = cost_type_1.CostTypeCategories;
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
        // this.loading = true;
        console.log('CREATE ' + this.costType.nome);
        // this.createNewSpesaEvent.emit(this.spesa);
        this.dialogRef.close();
        // this.spesa = new Cost();
        // this. loading = false;
    };
    return CostTypeAddComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CostTypeAddComponent.prototype, "dropdownType", null);
CostTypeAddComponent = __decorate([
    core_1.Component({
        template: __webpack_require__("./src/app/management/gestione-spese/cost-type-add/cost-type-add.component.html"),
        styles: [__webpack_require__("./src/app/management/gestione-spese/cost-type-add/cost-type-add.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof spesa_service_1.SpesaService !== "undefined" && spesa_service_1.SpesaService) === "function" && _a || Object, typeof (_b = typeof material_1.MatDialogRef !== "undefined" && material_1.MatDialogRef) === "function" && _b || Object])
], CostTypeAddComponent);
exports.CostTypeAddComponent = CostTypeAddComponent;
var _a, _b;
//# sourceMappingURL=cost-type-add.component.js.map

/***/ }),

/***/ "./src/app/management/gestione-spese/gestione-spese.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"display: inline-block; text-align: left; width: 100%;\">\r\n  <div class=\"alert alert-danger\">{{message}}</div>\r\n  <mat-card class=\"example-card\">\r\n    <mat-card-header>\r\n      <h3>Categorie di spesa</h3>\r\n      <span class=\"span-fill-remaining\"></span>\r\n      <div class=\"ProceedContainer ng-scope\">\r\n        <button mat-fab (click)=\"openDialog()\" color=\"primary\" style=\"color:white\">\r\n          <mat-icon>add</mat-icon>\r\n        </button>\r\n        <!-- <button (click)=\"openDialog()\" class=\"btn BKHBrandedButton Ccm-Button-Primary\">Aggiungi</button> -->\r\n      </div>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n      <div style=\"overflow:auto\">\r\n        <table class=\"table table-bordered table-striped\">\r\n          <thead>\r\n            <tr>\r\n              <td style=\"text-align : center\">\r\n                <strong>Categoria</strong>\r\n              </td>\r\n              <td style=\"text-align : center\">\r\n                <strong>SottoCategoria</strong>\r\n              </td>\r\n              <td style=\"text-align : center\">\r\n                <strong>Descrittivo</strong>\r\n              </td>\r\n              <td style=\"text-align : center\">\r\n                <strong>Attivo</strong>\r\n              </td>\r\n              <td colspan=\"2\"></td>\r\n\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let cat of costTypes\">\r\n              <td>{{cat.nome}}</td>\r\n              <td>{{cat.subCategory}}</td>\r\n              <td style=\"text-align : center\">\r\n                <mat-icon *ngIf=\"cat.hasDescription==false\">check_box_outline_blank</mat-icon>\r\n                <mat-icon *ngIf=\"cat.hasDescription==true\">check_box</mat-icon>\r\n              </td>\r\n              <td style=\"text-align : center\">\r\n                <mat-icon *ngIf=\"cat.active==false\">check_box_outline_blank</mat-icon>\r\n                <mat-icon *ngIf=\"cat.active==true\">check_box</mat-icon>\r\n              </td>\r\n              <!-- <td style=\"text-align : center; align-items: center; padding: 0px;\">\r\n                <button mat-icon-button><mat-icon class=\"mat-24\">mode_edit</mat-icon></button>\r\n              </td> -->\r\n              <td style=\"text-align : center; padding: 0px;\" colspan=\"2\">\r\n                <button mat-icon-button (click)=\"openConfirmationDelete(cat._id)\">\r\n                  <mat-icon class=\"mat-24\">delete</mat-icon>\r\n                </button>\r\n              </td>\r\n\r\n            </tr>\r\n\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </mat-card-content>\r\n  </mat-card>\r\n  <div>{{statusMessage}}</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/management/gestione-spese/gestione-spese.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/management/gestione-spese/gestione-spese.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var cost_type_add_component_1 = __webpack_require__("./src/app/management/gestione-spese/cost-type-add/cost-type-add.component.ts");
var spesa_service_1 = __webpack_require__("./src/app/_services/spesa.service.ts");
var confirmation_dialog_component_1 = __webpack_require__("./src/app/confirmation-dialog/confirmation-dialog.component.ts");
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
        this.message = '';
        this.dialogRef = this.dialog.open(cost_type_add_component_1.CostTypeAddComponent);
        this.dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result !== 'cancel') {
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
        console.log('ECCO');
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
        this.confirmDialog = this.dialog.open(confirmation_dialog_component_1.ConfirmationDialog, {
            disableClose: false
        });
        this.confirmDialog.componentInstance.confirmMessage = 'Sei sicuro di voler cancellare questo elemento?';
        this.confirmDialog.afterClosed().subscribe(function (result) {
            if (result) {
                console.log('CANCELLA');
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
    core_1.ViewChild('readOnlyTemplate'),
    __metadata("design:type", typeof (_a = typeof core_1.TemplateRef !== "undefined" && core_1.TemplateRef) === "function" && _a || Object)
], GestioneSpeseComponent.prototype, "readOnlyTemplate", void 0);
__decorate([
    core_1.ViewChild('editTemplate'),
    __metadata("design:type", typeof (_b = typeof core_1.TemplateRef !== "undefined" && core_1.TemplateRef) === "function" && _b || Object)
], GestioneSpeseComponent.prototype, "editTemplate", void 0);
GestioneSpeseComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'speseMngmt',
        template: __webpack_require__("./src/app/management/gestione-spese/gestione-spese.component.html"),
        styles: [__webpack_require__("./src/app/management/gestione-spese/gestione-spese.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof spesa_service_1.SpesaService !== "undefined" && spesa_service_1.SpesaService) === "function" && _c || Object, typeof (_d = typeof material_1.MatDialog !== "undefined" && material_1.MatDialog) === "function" && _d || Object])
], GestioneSpeseComponent);
exports.GestioneSpeseComponent = GestioneSpeseComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=gestione-spese.component.js.map

/***/ }),

/***/ "./src/app/management/gestione-store/gestione-store.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/management/gestione-store/gestione-store.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"display: inline-block; text-align: left; width: 100%;\">\r\n  <div class=\"alert alert-danger\">{{message}}</div>\r\n  <mat-card class=\"example-card\">\r\n    <mat-card-header>\r\n      <h3>Punti Vendita</h3>\r\n      <span class=\"span-fill-remaining\"></span>\r\n      <div class=\"ProceedContainer\">\r\n        <button mat-fab (click)=\"openDialog()\" color=\"primary\" style=\"color:white\">\r\n          <mat-icon>add</mat-icon>\r\n        </button>\r\n        <!-- <button class=\"btn BKHBrandedButton Ccm-Button-Primary\" (click)=\"openDialog()\">Aggiungi</button> -->\r\n      </div>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n      <div style=\"overflow:auto\">\r\n        <table class=\"table table-bordered table-striped\">\r\n          <thead>\r\n            <tr>\r\n              <td style=\"text-align : center\">\r\n                <strong>Nome</strong>\r\n              </td>\r\n              <td style=\"text-align : center\">\r\n                <strong>Indirizzo</strong>\r\n              </td>\r\n              <td style=\"text-align : center\">\r\n                <strong>P.iva</strong>\r\n              </td>\r\n              <td colspan=\"2\"></td>\r\n\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let store of stores\">\r\n              <td>{{store.nome}}</td>\r\n              <td>{{store.indirizzo}}</td>\r\n              <td>{{store.piva}}</td>\r\n\r\n\r\n              <td style=\"text-align : center; align-items: center; padding: 0px;\">\r\n                <button mat-icon-button (click)=\"openEditDialog(store)\">\r\n                  <mat-icon class=\"mat-24\">mode_edit</mat-icon>\r\n                </button>\r\n              </td>\r\n              <td style=\"text-align : center; padding: 0px;\">\r\n                <button mat-icon-button (click)=\"openConfirmationDelete(store._id)\">\r\n                  <mat-icon class=\"mat-24\">delete</mat-icon>\r\n                </button>\r\n              </td>\r\n\r\n            </tr>\r\n            <!-- <td style=\"text-align : center; align-items: center; padding: 0px;\">\r\n                  <button mat-icon-button><mat-icon class=\"mat-24\">mode_edit</mat-icon></button>\r\n                </td>\r\n                <td style=\"text-align : center; padding: 0px;\" colspan=\"2\">\r\n                  <button mat-icon-button (click)=\"openConfirmationDelete(cat._id)\"><mat-icon class=\"mat-24\" >delete</mat-icon></button>\r\n                </td>\r\n\r\n              </tr> -->\r\n\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </mat-card-content>\r\n  </mat-card>\r\n  <div>{{statusMessage}}</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/management/gestione-store/gestione-store.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var store_service_1 = __webpack_require__("./src/app/_services/store.service.ts");
var store_add_component_1 = __webpack_require__("./src/app/management/gestione-store/store-add/store-add.component.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var edit_dialog_component_1 = __webpack_require__("./src/app/edit-dialog/edit-dialog.component.ts");
var confirmation_dialog_component_1 = __webpack_require__("./src/app/confirmation-dialog/confirmation-dialog.component.ts");
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
        this.message = '';
        this.dialogRef = this.dialog.open(store_add_component_1.StoreAddComponent);
        this.dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result != 'cancel') {
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
        console.log('STORE ID TO MOD ==>' + JSON.stringify(store));
        this.editDialog = this.dialog.open(edit_dialog_component_1.EditDialogComponent, {
            disableClose: false
        });
        this.editDialog.componentInstance.storeObj = store;
        this.editDialog.afterClosed().subscribe(function (result) {
            if (result) {
                console.log('opeEditDialog result: ' + result);
                _this._storeService.updateStore(_this.editDialog.componentInstance.storeObj);
                _this.getList();
            }
            _this.editDialog = null;
        });
    };
    GestioneStoreComponent.prototype.openConfirmationDelete = function (id) {
        var _this = this;
        this.confirmDialog = this.dialog.open(confirmation_dialog_component_1.ConfirmationDialog, {
            disableClose: false
        });
        this.confirmDialog.componentInstance.confirmMessage = 'Sei sicuro di voler cancellare questo elemento?';
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
    core_1.Component({
        selector: 'storeMngmt',
        template: __webpack_require__("./src/app/management/gestione-store/gestione-store.component.html"),
        styles: [__webpack_require__("./src/app/management/gestione-store/gestione-store.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof store_service_1.StoreService !== "undefined" && store_service_1.StoreService) === "function" && _a || Object, typeof (_b = typeof material_1.MatDialog !== "undefined" && material_1.MatDialog) === "function" && _b || Object])
], GestioneStoreComponent);
exports.GestioneStoreComponent = GestioneStoreComponent;
var _a, _b;
//# sourceMappingURL=gestione-store.component.js.map

/***/ }),

/***/ "./src/app/management/gestione-store/store-add/store-add.component.css":
/***/ (function(module, exports) {

module.exports = ".example-full-width {\r\n  width: 100%;\r\n}\r\n\r\n.example-form {\r\n  width: 500px;\r\n}\r\n\r\nmd-select {\r\n  /* display: inline-block;\r\n  /margin-top: 2px; */\r\n  width: 100%;\r\n  padding-bottom: 26px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/management/gestione-store/store-add/store-add.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 mat-dialog-title>\r\n    Aggiungi</h3>\r\n  <form #storeForm=\"ngForm\" (ngSubmit)=\"f.form.valid && create()\" #f=\"ngForm\" novalidate>\r\n\r\n    <div mat-dialog-content>\r\n\r\n      <mat-input-container class=\"example-full-width\">\r\n        <input matInput [(ngModel)]=\"store.nome\" placeholder=\"Nome\" autocomplete=\"off\" #nome=\"ngModel\" name=\"nome\" required>\r\n      </mat-input-container>\r\n      <mat-input-container class=\"example-full-width\">\r\n        <input matInput [(ngModel)]=\"store.indirizzo\" placeholder=\"Indirizzo\" autocomplete=\"off\" #indirizzo=\"ngModel\" name=\"indirizzo\"\r\n          required>\r\n      </mat-input-container>\r\n      <mat-input-container class=\"example-full-width\">\r\n          <input matInput [(ngModel)]=\"store.piva\" placeholder=\"Partita Iva\" autocomplete=\"off\" #piva=\"ngModel\" name=\"piva\" required>\r\n        </mat-input-container>\r\n\r\n\r\n      <mat-checkbox class=\"example-margin\" #active=\"ngModel\" name=\"active\" [(ngModel)]=\"store\" >Attivo</mat-checkbox>\r\n\r\n\r\n    </div>\r\n    <div mat-dialog-actions>\r\n      <div class=\"ProceedContainer ng-scope\">\r\n        <button mat-dialog-close=\"cancel\" class=\"btn BKHBrandedButton Ccm-Button-Primary\">Annulla</button>\r\n      </div>\r\n      <span class=\"span-fill-remaining\"></span>\r\n      <div class=\"ProceedContainer ng-scope\">\r\n        <button class=\"btn BKHBrandedButton Ccm-Button-Primary\" [disabled]=\"storeForm.invalid || storeForm.pending\">Aggiungi</button>\r\n      </div>\r\n\r\n    </div>\r\n\r\n  </form>\r\n"

/***/ }),

/***/ "./src/app/management/gestione-store/store-add/store-add.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var store_1 = __webpack_require__("./src/app/entity/store.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var StoreAddComponent = (function () {
    function StoreAddComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.store = new store_1.Store();
    }
    StoreAddComponent.prototype.ngOnInit = function () {
    };
    StoreAddComponent.prototype.create = function () {
        console.log(this + '=' + JSON.stringify(this.store));
        this.dialogRef.close();
    };
    ;
    return StoreAddComponent;
}());
StoreAddComponent = __decorate([
    core_1.Component({
        selector: 'app-store-add',
        template: __webpack_require__("./src/app/management/gestione-store/store-add/store-add.component.html"),
        styles: [__webpack_require__("./src/app/management/gestione-store/store-add/store-add.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.MatDialogRef !== "undefined" && material_1.MatDialogRef) === "function" && _a || Object])
], StoreAddComponent);
exports.StoreAddComponent = StoreAddComponent;
var _a;
//# sourceMappingURL=store-add.component.js.map

/***/ }),

/***/ "./src/app/management/gestione-utente/gestione-utente.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/management/gestione-utente/gestione-utente.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"display: inline-block; text-align: left; width: 100%;\">\r\n  <div class=\"alert alert-danger\">{{message}}</div>\r\n  <mat-card class=\"example-card\">\r\n    <mat-card-header>\r\n      <h3>Utenti</h3>\r\n      <span class=\"span-fill-remaining\"></span>\r\n      <div class=\"ProceedContainer ng-scope\">\r\n        <button mat-fab (click)=\"openDialog()\" color=\"primary\" style=\"color:white\">\r\n          <mat-icon>add</mat-icon>\r\n        </button>\r\n        <!-- <button class=\"btn BKHBrandedButton Ccm-Button-Primary\" (click)=\"openDialog()\">Aggiungi</button> -->\r\n      </div>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n      <div style=\"overflow:auto\">\r\n        <table class=\"table table-bordered table-striped\">\r\n          <thead>\r\n            <tr>\r\n              <td style=\"text-align : center\">\r\n                <strong>User ID</strong>\r\n              </td>\r\n              <td style=\"text-align : center\">\r\n                <strong>Nome</strong>\r\n              </td>\r\n              <td style=\"text-align : center\">\r\n                <strong>Cognome</strong>\r\n              </td>\r\n              <td style=\"text-align : center\">\r\n                <strong>Ruolo</strong>\r\n              </td>\r\n              <td style=\"text-align : center\">\r\n                <strong>e-mail</strong>\r\n              </td>\r\n              <td style=\"text-align : center\">\r\n                <strong>Punto Vendita</strong>\r\n              </td>\r\n              <td colspan=\"2\"></td>\r\n\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let user of users\">\r\n              <td>{{user.username}}</td>\r\n              <td>{{user.name}}</td>\r\n              <td>{{user.surname}}</td>\r\n              <td>{{user.ruolo}}</td>\r\n              <td>{{user.email}}</td>\r\n              <td>{{user.store.nome}}</td>\r\n\r\n              <td style=\"text-align : center; align-items: center; padding: 0px;\">\r\n                <button mat-icon-button (click)=\"openEditDialog(user)\">\r\n                  <mat-icon class=\"mat-24\">mode_edit</mat-icon>\r\n                </button>\r\n              </td>\r\n              <td style=\"text-align : center; padding: 0px;\">\r\n                <button mat-icon-button (click)=\"openConfirmationDelete(user._id)\">\r\n                  <mat-icon class=\"mat-24\">delete</mat-icon>\r\n                </button>\r\n              </td>\r\n\r\n            </tr>\r\n            <!-- <td style=\"text-align : center; align-items: center; padding: 0px;\">\r\n                  <button mat-icon-button><mat-icon class=\"mat-24\">mode_edit</mat-icon></button>\r\n                </td>\r\n                <td style=\"text-align : center; padding: 0px;\" colspan=\"2\">\r\n                  <button mat-icon-button (click)=\"openConfirmationDelete(cat._id)\"><mat-icon class=\"mat-24\" >delete</mat-icon></button>\r\n                </td>\r\n\r\n              </tr> -->\r\n\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </mat-card-content>\r\n  </mat-card>\r\n  <div>{{statusMessage}}</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/management/gestione-utente/gestione-utente.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var user_service_1 = __webpack_require__("./src/app/_services/user.service.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var user_add_component_1 = __webpack_require__("./src/app/management/gestione-utente/user-add/user-add.component.ts");
var confirmation_dialog_component_1 = __webpack_require__("./src/app/confirmation-dialog/confirmation-dialog.component.ts");
var edit_dialog_component_1 = __webpack_require__("./src/app/edit-dialog/edit-dialog.component.ts");
var store_service_1 = __webpack_require__("./src/app/_services/store.service.ts");
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
        this.dialogRef = this.dialog.open(user_add_component_1.UserAddComponent);
        this.dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result !== 'cancel') {
                _this.create(_this.dialogRef.componentInstance.user);
                _this.getList();
            }
        });
    };
    GestioneUtenteComponent.prototype.openConfirmationDelete = function (id) {
        var _this = this;
        this.confirmDialog = this.dialog.open(confirmation_dialog_component_1.ConfirmationDialog, {
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
        this.editDialog = this.dialog.open(edit_dialog_component_1.EditDialogComponent, {
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
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'userMngmt',
        template: __webpack_require__("./src/app/management/gestione-utente/gestione-utente.component.html"),
        styles: [__webpack_require__("./src/app/management/gestione-utente/gestione-utente.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof store_service_1.StoreService !== "undefined" && store_service_1.StoreService) === "function" && _a || Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" && _b || Object, typeof (_c = typeof material_1.MatDialog !== "undefined" && material_1.MatDialog) === "function" && _c || Object])
], GestioneUtenteComponent);
exports.GestioneUtenteComponent = GestioneUtenteComponent;
var _a, _b, _c;
//# sourceMappingURL=gestione-utente.component.js.map

/***/ }),

/***/ "./src/app/management/gestione-utente/show-error/show-errors.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var ShowErrorsComponent = ShowErrorsComponent_1 = (function () {
    function ShowErrorsComponent() {
    }
    ShowErrorsComponent.prototype.shouldShowErrors = function () {
        return this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched);
    };
    ShowErrorsComponent.prototype.listOfErrors = function () {
        var _this = this;
        return Object.keys(this.control.errors)
            .map(function (field) { return _this.getMessage(field, _this.control.errors[field]); });
    };
    ShowErrorsComponent.prototype.getMessage = function (type, params) {
        return ShowErrorsComponent_1.errorMessages[type](params);
    };
    return ShowErrorsComponent;
}());
ShowErrorsComponent.errorMessages = {
    'required': function () { return ''; },
    'minlength': function (params) { return 'The min number of characters is ' + params.requiredLength; },
    'maxlength': function (params) { return 'The max allowed number of characters is ' + params.requiredLength; },
    'pattern': function (params) { return 'The required pattern is: ' + params.requiredPattern; },
    'years': function (params) { return params.message; },
    'countryCity': function (params) { return params.message; },
    'uniqueName': function (params) { return params.message; },
    'telephoneNumbers': function (params) { return params.message; },
    'telephoneNumber': function (params) { return params.message; }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ShowErrorsComponent.prototype, "control", void 0);
ShowErrorsComponent = ShowErrorsComponent_1 = __decorate([
    core_1.Component({
        selector: 'app-show-errors',
        template: '<ul *ngIf="shouldShowErrors()"><li style="color: red" *ngFor="let error of listOfErrors()">{{error}}</li></ul>'
    })
], ShowErrorsComponent);
exports.ShowErrorsComponent = ShowErrorsComponent;
var ShowErrorsComponent_1, _a, _b;
//# sourceMappingURL=show-errors.component.js.map

/***/ }),

/***/ "./src/app/management/gestione-utente/user-add/user-add.component.css":
/***/ (function(module, exports) {

module.exports = ".example-full-width {\r\n  width: 100%;\r\n}\r\n\r\n.example-form {\r\n  width: 500px;\r\n}\r\n\r\nmd-select {\r\n  /* display: inline-block;\r\n  /margin-top: 2px; */\r\n  width: 100%;\r\n  padding-bottom: 26px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/management/gestione-utente/user-add/user-add.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 mat-dialog-title>\r\n  Aggiungi</h3>\r\n<form #userForm=\"ngForm\" (ngSubmit)=\"create(userForm)\" novalidate>\r\n<pre></pre>\r\n  <div mat-dialog-content>\r\n\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput [(ngModel)]=\"user.name\" placeholder=\"Nome\" autocomplete=\"off\" #name=\"ngModel\" name=\"name\" required>\r\n      <app-show-errors [control]=\"name\"></app-show-errors>\r\n    </mat-form-field>\r\n\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput [(ngModel)]=\"user.surname\" placeholder=\"Cognome\" autocomplete=\"off\" #surname=\"ngModel\" name=\"surname\" required>\r\n    </mat-form-field>\r\n\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput [(ngModel)]=\"user.username\" placeholder=\"Username\" autocomplete=\"off\" #username=\"ngModel\" name=\"username\"\r\n        required>\r\n    </mat-form-field>\r\n\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput [(ngModel)]=\"user.password\" type=\"password\" placeholder=\"Password\" autocomplete=\"off\" #password=\"ngModel\"\r\n        name=\"password\" required>\r\n    </mat-form-field>\r\n\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput [(ngModel)]=\"user.email\" placeholder=\"Email\" autocomplete=\"off\" name=\"email\" required>\r\n    </mat-form-field>\r\n\r\n    <mat-form-field class=\"example-full-width\">\r\n      <mat-select placeholder=\"Ruolo\" [(ngModel)]=\"user.ruolo\" #role=\"ngModel\" name=\"role\" required>\r\n        <mat-option *ngFor=\"let ruolo of ruoli | keys\" [value]=\"ruolo.value\">\r\n          {{ruolo.value}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <mat-form-field class=\"example-full-width\">\r\n      <mat-select placeholder=\"Punto Vendita\" [(ngModel)]=\"user.store\" #nome=\"ngModel\" name=\"store\" required>\r\n        <mat-option *ngFor=\"let store of stores\" [value]=\"store\">\r\n          {{store.nome}} - {{store.indirizzo}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n\r\n\r\n\r\n    <mat-checkbox class=\"example-margin\" #subCategory=\"ngModel\" name=\"active\" [(ngModel)]=\"user.active\" checked=\"user.active\"\r\n      value=\"user.active\">Attivo</mat-checkbox>\r\n\r\n\r\n  </div>\r\n  <div mat-dialog-actions>\r\n    <div class=\"ProceedContainer ng-scope\">\r\n      <button mat-dialog-close=\"cancel\" class=\"btn BKHBrandedButton Ccm-Button-Primary\">Annulla</button>\r\n    </div>\r\n    <span class=\"span-fill-remaining\"></span>\r\n    <div class=\"ProceedContainer ng-scope\">\r\n      <button class=\"btn BKHBrandedButton Ccm-Button-Primary\" [disabled]=\"userForm.invalid || userForm.pending\">Aggiungi</button>\r\n    </div>\r\n\r\n  </div>\r\n\r\n</form>\r\n"

/***/ }),

/***/ "./src/app/management/gestione-utente/user-add/user-add.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var user_1 = __webpack_require__("./src/app/entity/user.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var store_service_1 = __webpack_require__("./src/app/_services/store.service.ts");
var UserAddComponent = (function () {
    function UserAddComponent(_storeService, dialogRef) {
        this._storeService = _storeService;
        this.dialogRef = dialogRef;
        this.user = new user_1.User();
        this.ruoli = user_1.Ruolo;
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
    UserAddComponent.prototype.create = function (myForm) {
        console.log('UserAddComponent=' + JSON.stringify(this.user));
        this.dialogRef.close();
    };
    return UserAddComponent;
}());
UserAddComponent = __decorate([
    core_1.Component({
        template: __webpack_require__("./src/app/management/gestione-utente/user-add/user-add.component.html"),
        styles: [__webpack_require__("./src/app/management/gestione-utente/user-add/user-add.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof store_service_1.StoreService !== "undefined" && store_service_1.StoreService) === "function" && _a || Object, typeof (_b = typeof material_1.MatDialogRef !== "undefined" && material_1.MatDialogRef) === "function" && _b || Object])
], UserAddComponent);
exports.UserAddComponent = UserAddComponent;
var _a, _b;
//# sourceMappingURL=user-add.component.js.map

/***/ }),

/***/ "./src/app/management/management.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/management/management.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"Ccm-MainContentView ng-scope\">\r\n<mat-tab-group style=\"font-size:12px\">\r\n  <mat-tab id=\"tabSpeseCat\" label=\"Gestione Spese\">\r\n    <speseMngmt></speseMngmt>\r\n  </mat-tab>\r\n  <mat-tab label=\"Utenti\">\r\n      <userMngmt></userMngmt>\r\n  </mat-tab>\r\n  <mat-tab label=\"Punti Vendita\">\r\n      <storeMngmt></storeMngmt>\r\n  </mat-tab>\r\n</mat-tab-group>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/management/management.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var ManagementComponent = (function () {
    function ManagementComponent() {
    }
    ManagementComponent.prototype.ngOnInit = function () {
    };
    return ManagementComponent;
}());
ManagementComponent = __decorate([
    core_1.Component({
        template: __webpack_require__("./src/app/management/management.component.html"),
        styles: [__webpack_require__("./src/app/management/management.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ManagementComponent);
exports.ManagementComponent = ManagementComponent;
//# sourceMappingURL=management.component.js.map

/***/ }),

/***/ "./src/app/report/general-report.component.css":
/***/ (function(module, exports) {

module.exports = "html, body, material-app, mat-sidenav-container, .my-content {\r\n  margin: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n"

/***/ }),

/***/ "./src/app/report/general-report.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\r\n  <button mat-icon-button (click)=\"sidenav.open()\">\r\n    <mat-icon class=\"md-24\">menu</mat-icon>\r\n  </button>\r\n</mat-toolbar>\r\n<div style=\"height: 100%\">\r\n  <mat-sidenav-container class=\"sidenav-container\">\r\n    <mat-sidenav #sidenav mode=\"over\" opened=\"true\">\r\n      <mat-expansion-panel>\r\n        <mat-expansion-panel-header class=\"primary\">\r\n          <mat-panel-title>\r\n            Costi\r\n          </mat-panel-title>\r\n          <mat-panel-description></mat-panel-description>\r\n        </mat-expansion-panel-header>\r\n        link report1\r\n      </mat-expansion-panel>\r\n      <mat-expansion-panel>\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title>\r\n            Ricavi\r\n          </mat-panel-title>\r\n          <mat-panel-description></mat-panel-description>\r\n        </mat-expansion-panel-header>\r\n        link report2\r\n      </mat-expansion-panel>\r\n      <mat-expansion-panel>\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title>\r\n            Incidenza\r\n          </mat-panel-title>\r\n          <mat-panel-description></mat-panel-description>\r\n        </mat-expansion-panel-header>\r\n        <mat-nav-list>\r\n          <a md-list-item [routerLink]=\"['incidenza']\">\r\n            <div md-line>Intervallo</div>\r\n          </a>\r\n          <a md-list-item>\r\n            <div md-line>Giorno</div>\r\n          </a>\r\n        </mat-nav-list>\r\n\r\n\r\n\r\n      </mat-expansion-panel>\r\n\r\n    </mat-sidenav>\r\n\r\n\r\n\r\n    <div style=\"min-height: 200px;\">\r\n      <router-outlet></router-outlet>\r\n    </div>\r\n  </mat-sidenav-container>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/report/general-report.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var GeneralReportComponent = (function () {
    function GeneralReportComponent() {
    }
    return GeneralReportComponent;
}());
GeneralReportComponent = __decorate([
    core_1.Component({
        selector: 'app-general-report',
        template: __webpack_require__("./src/app/report/general-report.component.html"),
        styles: [__webpack_require__("./src/app/report/general-report.component.css")]
    })
], GeneralReportComponent);
exports.GeneralReportComponent = GeneralReportComponent;
//# sourceMappingURL=general-report.component.js.map

/***/ }),

/***/ "./src/app/report/incidenza-report/incidenza-report.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/report/incidenza-report/incidenza-report.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-expansion-panel>\r\n  <mat-expansion-panel-header>\r\n    <mat-panel-title>\r\n      Filtri\r\n    </mat-panel-title>\r\n    <mat-panel-description>\r\n      inserisci i filtri qui\r\n    </mat-panel-description>\r\n  </mat-expansion-panel-header>\r\n\r\n  <mat-form-field>\r\n    <input matInput [matDatepicker]=\"picker1\" placeholder=\"Dal\" [formControl]=\"dateFrom\">\r\n    <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n    <mat-datepicker #picker1></mat-datepicker>\r\n  </mat-form-field>\r\n\r\n  <mat-form-field>\r\n    <input matInput [matDatepicker]=\"picker2\" placeholder=\"A tutto il\"\r\n           [formControl]=\"dateTo\">\r\n    <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n    <mat-datepicker #picker2></mat-datepicker>\r\n  </mat-form-field>\r\n</mat-expansion-panel>\r\n<dx-chart [dataSource]=\"costList\">\r\n  <dxi-series argumentField=\"descrizione\" valueField=\"valore\" type=\"bar\"></dxi-series>\r\n</dx-chart>\r\n"

/***/ }),

/***/ "./src/app/report/incidenza-report/incidenza-report.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
var reports_service_1 = __webpack_require__("./src/app/_services/reports.service.ts");
// import CustomStore from 'devextreme/data/custom_store';
var IncidenzaReportComponent = (function () {
    function IncidenzaReportComponent(_reportsService) {
        this._reportsService = _reportsService;
    }
    IncidenzaReportComponent.prototype.ngOnInit = function () {
        this.getList();
        this.dateFrom = new forms_1.FormControl(new Date());
        this.dateTo = new forms_1.FormControl(new Date());
        // this.chartData = JSON.stringify(this.costList);
    };
    IncidenzaReportComponent.prototype.getList = function () {
        var _this = this;
        /* Lo user sarà selezionato dai filtri */
        var usr = JSON.parse(localStorage.getItem('currUser'));
        this._reportsService.getTodayIncidenza(usr.store._id)
            .then(function (spese) { _this.costList = spese; _this.costListJSON = JSON.stringify(spese); })
            .catch(function (err) { return console.log(err); });
    };
    IncidenzaReportComponent.prototype.getReport = function (from, to, store) {
    };
    return IncidenzaReportComponent;
}());
IncidenzaReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__("./src/app/report/incidenza-report/incidenza-report.component.html"),
        styles: [__webpack_require__("./src/app/report/incidenza-report/incidenza-report.component.css")],
        encapsulation: core_1.ViewEncapsulation.None,
        preserveWhitespaces: false,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof reports_service_1.ReportsService !== "undefined" && reports_service_1.ReportsService) === "function" && _a || Object])
], IncidenzaReportComponent);
exports.IncidenzaReportComponent = IncidenzaReportComponent;
var _a;
//# sourceMappingURL=incidenza-report.component.js.map

/***/ }),

/***/ "./src/app/spese/spese-new/spese-new.component.css":
/***/ (function(module, exports) {

module.exports = ".example-full-width {\r\n  width: 100%;\r\n}\r\n\r\n.example-form {\r\n  width: 500px;\r\n}\r\n\r\nmat-select {\r\n  /* display: inline-block;\r\n  /margin-top: 2px; */\r\n  width: 100%;\r\n  padding-bottom: 26px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/spese/spese-new/spese-new.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 mat-dialog-title>\r\n  Nuova Spesa</h3>\r\n<form name=\"form\" (ngSubmit)=\"f.form.valid && create()\" #f=\"ngForm\" novalidate>\r\n\r\n  <div mat-dialog-content>\r\n\r\n\r\n    <mat-form-field class=\"example-full-width\">\r\n      <mat-select placeholder=\"Categoria\" name=\"tmpCategory\" [(ngModel)]=\"tmpCategory\" [required]=\"true\" (change)=\"getSubCategoryList()\">\r\n        <mat-option *ngFor=\"let types of categoryTypes | keys\" [value]=\"types.value\">\r\n          {{types.value}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n\r\n\r\n\r\n\r\n    <!-- <mat-form-field *ngIf=\"tmpCategory=='Food' || tmpCategory=='Delivery' || tmpCategory=='Ticket'\"> -->\r\n    <mat-form-field class=\"example-full-width\" *ngIf=\"tmpCategory!='Manutenzione' && tmpCategory!='Varie' && tmpCategory!='Stipendi'\">\r\n      <mat-select placeholder=\"Spesa\" [(ngModel)]=\"spesa.tipo\" name=\"tipo\" [required]=\"true\" (change)=\"setDescription()\">\r\n        <mat-option *ngFor=\"let types of costTypes\" [value]=\"types\">\r\n          {{types.subCategory}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n\r\n\r\n\r\n    <mat-form-field class=\"example-full-width\" *ngIf=\"tmpCategory=='Manutenzione' || tmpCategory=='Varie' || tmpCategory=='Stipendi'\">\r\n      <input matInput placeholder=\"Spesa\" [(ngModel)]=\"spesa.descrizione\" name=\"descrizione\" [required]=\"true\">\r\n    </mat-form-field>\r\n\r\n\r\n\r\n\r\n\r\n    <mat-form-field class=\"example-full-width\">\r\n      <input matInput [(ngModel)]=\"spesa.valore\" placeholder=\"Valore(€)\" autocomplete=\"off\" #valore=\"ngModel\" name=\"valore\" required>\r\n    </mat-form-field>\r\n\r\n\r\n\r\n\r\n\r\n\r\n  </div>\r\n\r\n\r\n  <div mat-dialog-actions>\r\n    <div class=\"ProceedContainer ng-scope\">\r\n      <button mat-dialog-close=\"cancel\" class=\"btn BKHBrandedButton Ccm-Button-Primary\">Annulla</button>\r\n    </div>\r\n    <span class=\"span-fill-remaining\"></span>\r\n    <div class=\"ProceedContainer ng-scope\">\r\n      <button matButton [disabled]=\"loading\" class=\"btn BKHBrandedButton Ccm-Button-Primary\">Aggiungi</button>\r\n    </div>\r\n    <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmatEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fmatgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmatsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"\r\n    />\r\n  </div>\r\n\r\n</form>\r\n"

/***/ }),

/***/ "./src/app/spese/spese-new/spese-new.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
var cost_1 = __webpack_require__("./src/app/entity/cost.ts");
var cost_type_1 = __webpack_require__("./src/app/entity/cost-type.ts");
var spesa_service_1 = __webpack_require__("./src/app/_services/spesa.service.ts");
var SpeseNewComponent = (function () {
    function SpeseNewComponent(_spesaService, dialogRef, data) {
        this._spesaService = _spesaService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.descrizioneFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required,
        ]);
        this.categoryTypes = cost_type_1.CostTypeCategories;
        this.loading = false;
        this.spesa = new cost_1.Cost();
        this.createNewSpesaEvent = new core_1.EventEmitter();
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
            if ((_this.tmpCategory === 'Manutenzione') || (_this.tmpCategory === 'Varie') || (_this.tmpCategory === 'Stipendi')) {
                console.log('tmpCategory=' + _this.tmpCategory);
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
    core_1.Output(),
    __metadata("design:type", Object)
], SpeseNewComponent.prototype, "createNewSpesaEvent", void 0);
SpeseNewComponent = __decorate([
    core_1.Component({
        // selector: 'app-spese-new',
        template: __webpack_require__("./src/app/spese/spese-new/spese-new.component.html"),
        styles: [__webpack_require__("./src/app/spese/spese-new/spese-new.component.css")]
    }),
    __param(2, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [typeof (_a = typeof spesa_service_1.SpesaService !== "undefined" && spesa_service_1.SpesaService) === "function" && _a || Object, typeof (_b = typeof material_1.MatDialogRef !== "undefined" && material_1.MatDialogRef) === "function" && _b || Object, Object])
], SpeseNewComponent);
exports.SpeseNewComponent = SpeseNewComponent;
var _a, _b;
//# sourceMappingURL=spese-new.component.js.map

/***/ }),

/***/ "./src/app/spese/spese.component.css":
/***/ (function(module, exports) {

module.exports = ".note {\r\n  float:left;\r\n  position: relative;\r\n  width: 100%;\r\n  padding: 1em 1.5em;\r\n  margin: 0.5em auto;\r\n  color: black;\r\n  background: #f0f4ee;\r\n\r\n}\r\n .note:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  border-width: 0 16px 16px 0;\r\n  border-style: solid;\r\n  border-color: #fff #fff #f0f4ee #f0f4ee;\r\n  background: #f0f4ee;\r\n  -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.3), -1px 1px 1px rgba(0,0,0,0.2);\r\n  box-shadow: 0 1px 1px rgba(0,0,0,0.3), -1px 1px 1px rgba(0,0,0,0.2);\r\n\r\n  display: block; width: 0;\r\n}\r\n .note.rounded {\r\n  border-radius: 5px 0 5px 5px;\r\n}\r\n .note.rounded:before {\r\n  border-width: 8px;\r\n  border-color: #fff #fff transparent transparent;\r\n  border-radius: 0 0 0 5px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/spese/spese.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"overflow-y: hidden;\">\r\n<!-- <div style=\"display: inline-block; text-align: left; width: 100%;\"> -->\r\n<div class=\"alert alert-danger\">{{message}}</div>\r\n\r\n<h3 style=\"float:left;\">Spese del giorno: {{today | date: 'dd/MM/y'}}</h3>\r\n\r\n<div style=\"float:right; margin: 10px\">\r\n  <button mat-fab (click)=\"openDialog()\" color=\"primary\" style=\"color:white\">\r\n    <mat-icon>add</mat-icon>\r\n  </button>\r\n</div>\r\n\r\n\r\n<!-- <div fxLayout=\"column\" fxFill> -->\r\n\r\n  <div style=\"float:left; width:100%; height:100%; padding:1em 0.5em; border: 0px solid black\">\r\n    <mat-list>\r\n      <mat-list-item *ngFor=\"let spesa of spesaList\" >\r\n        <div class=\"note red rounded\">\r\n          <span style='float:left; background-color: none; text-align: left;'>\r\n            <h3 style=\"text-align: left;\">\r\n              <strong>{{spesa.descrizione}}</strong>\r\n            </h3>\r\n            <h6 mat-line>({{spesa.tipo.nome}})</h6>\r\n            <p style=\"font-size: 8px;text-align: left;\" mat-line>{{spesa.update_on | date : 'H:mm:ss'}}</p>\r\n          </span>\r\n\r\n\r\n          <span style=\"float: right; background-color: none; text-align: right;\">\r\n            <h3>\r\n              <strong>{{spesa.valore}}&euro;</strong>\r\n            </h3>\r\n            <button mat-icon-button (click)=\"openConfirmationDelete(spesa._id)\">\r\n              <mat-icon class=\"mat-24\">delete</mat-icon>\r\n            </button>\r\n          </span>\r\n        </div>\r\n\r\n      </mat-list-item>\r\n    </mat-list>\r\n  </div>\r\n\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/spese/spese.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var spese_new_component_1 = __webpack_require__("./src/app/spese/spese-new/spese-new.component.ts");
var spesa_service_1 = __webpack_require__("./src/app/_services/spesa.service.ts");
var shared_service_1 = __webpack_require__("./src/app/_services/shared.service.ts");
var confirmation_dialog_component_1 = __webpack_require__("./src/app/confirmation-dialog/confirmation-dialog.component.ts");
var TimerObservable_1 = __webpack_require__("./node_modules/rxjs/_esm5/observable/TimerObservable.js");
var SpeseComponent = (function () {
    function SpeseComponent(_spesaService, sharedService, ref, dialog) {
        var _this = this;
        this._spesaService = _spesaService;
        this.sharedService = sharedService;
        this.ref = ref;
        this.dialog = dialog;
        this.visible = false;
        this.today = Date.now();
        // @Input() spesaList: Array<Cost> = [];
        this.spesaList = [];
        this.alive = true;
        this.sharedService.SpesaList.subscribe(function (value) {
            _this.spesaList = value;
        });
    }
    SpeseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usr = JSON.parse(localStorage.getItem('currUser'));
        this.today = new Date(this.usr.store.ref_date).getTime();
        this.getList();
        /* const timer = Observable.timer(2000, 5000);
        timer.subscribe(() => this.getList()); */
        TimerObservable_1.TimerObservable.create(0, 5000)
            .takeWhile(function () { return _this.alive; })
            .subscribe(function () { return _this.getList(); });
    };
    SpeseComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    SpeseComponent.prototype.getList = function () {
        var _this = this;
        this._spesaService
            .getTodaySpesaList(this.usr.store._id)
            .then(function (spese) {
            // this.spesaList = spese;
            _this.sharedService.SpesaList.next(spese);
            _this.ref.detectChanges();
        })
            .catch(function (err) { return console.log(err); });
    };
    SpeseComponent.prototype.create = function (spesa) {
        var _this = this;
        // console.log("ECCO");
        var tmpSpesa = spesa;
        this.message = '';
        tmpSpesa.utente = this.usr;
        tmpSpesa.store = this.usr.store;
        // console.log("tmpSpesa -->" + JSON.stringify(tmpSpesa));
        this._spesaService
            .addSpesa(tmpSpesa)
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
        var dialogRef = this.dialog.open(spese_new_component_1.SpeseNewComponent);
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
    SpeseComponent.prototype.openConfirmationDelete = function (id) {
        var _this = this;
        this.confirmDialog = this.dialog.open(confirmation_dialog_component_1.ConfirmationDialog, {
            disableClose: false
        });
        this.confirmDialog.componentInstance.confirmMessage = 'Sei sicuro di voler cancellare questo elemento?';
        this.confirmDialog.afterClosed().subscribe(function (result) {
            if (result) {
                console.log('CANCELLA');
                _this._spesaService.deleteCost(id)
                    .then(function (types) { })
                    .catch(function (err) { return console.log(err); });
            }
            _this.confirmDialog = null;
        });
    };
    return SpeseComponent;
}());
SpeseComponent = __decorate([
    core_1.Component({
        selector: 'app-spese',
        template: __webpack_require__("./src/app/spese/spese.component.html"),
        styles: [__webpack_require__("./src/app/spese/spese.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof spesa_service_1.SpesaService !== "undefined" && spesa_service_1.SpesaService) === "function" && _a || Object, typeof (_b = typeof shared_service_1.SharedService !== "undefined" && shared_service_1.SharedService) === "function" && _b || Object, typeof (_c = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" && _c || Object, typeof (_d = typeof material_1.MatDialog !== "undefined" && material_1.MatDialog) === "function" && _d || Object])
], SpeseComponent);
exports.SpeseComponent = SpeseComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=spese.component.js.map

/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
var app_module_1 = __webpack_require__("./src/app/app.module.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var fastClick = __webpack_require__("./node_modules/fastclick/lib/fastclick.js");
fastClick.attach(document.body);
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map