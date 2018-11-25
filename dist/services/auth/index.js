"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird = require("bluebird");
const jwt = require("jsonwebtoken");
const user_1 = require("../../db/model/user");
const secret = "secret";
const jwtSignToken = bluebird.promisify(jwt.sign);
exports.signToken = (data) => {
    const hour = Math.floor(Date.now() / 1000) + 60 * 60;
    return jwtSignToken({
        exp: hour * 24 * 365,
        data
    }, secret);
};
exports.checkAuth = (authorization) => __awaiter(this, void 0, void 0, function* () {
    if (!authorization) {
        return null;
    }
    const { data: { id } } = jwt.verify(authorization, secret);
    const [user = {}] = yield user_1.findUserById(id);
    delete user.password;
    return user;
});
//# sourceMappingURL=index.js.map