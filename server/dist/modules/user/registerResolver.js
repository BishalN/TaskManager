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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerResolver = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../entity/User");
const registerInput_1 = require("./registerInput");
const loginOutput_1 = require("./loginOutput");
const generateToken_1 = require("./generateToken");
let registerResolver = class registerResolver {
    register({ username, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAlreadyExists = yield User_1.User.findOne({ where: { email } });
            if (userAlreadyExists)
                throw new Error("user with that email already exists");
            const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
            const user = User_1.User.create({ username, email, password: hashedPassword });
            yield user.save();
            return user;
        });
    }
    login(email, password, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({ where: { email } });
                if (!user)
                    throw new Error("Invalid credentials");
                const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordMatch)
                    throw new Error("Invalid credentials");
                res.cookie("jid", generateToken_1.generateRefreshToken(user.id), {
                    httpOnly: true,
                    path: "/refresh_token",
                });
                const token = generateToken_1.generateAccessToken(user.id);
                const outputUser = Object.assign(Object.assign({}, user), { token });
                return outputUser;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    logout({ res }) {
        res.clearCookie("jid");
        return true;
    }
};
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerInput_1.registerInput]),
    __metadata("design:returntype", Promise)
], registerResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => loginOutput_1.loginOutput),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], registerResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], registerResolver.prototype, "logout", null);
registerResolver = __decorate([
    type_graphql_1.Resolver()
], registerResolver);
exports.registerResolver = registerResolver;
//# sourceMappingURL=registerResolver.js.map