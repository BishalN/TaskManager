"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const User_1 = require("../entity/User");
const isAuthenticated = ({ root, args, context, info, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = context.req.user.id;
        const user = yield User_1.User.findOne(id);
        if (user) {
            return true;
        }
    }
    catch (error) {
        return false;
    }
    return false;
});
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map