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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const createTypeormConnection_1 = require("./utils/createTypeormConnection");
const resolver_1 = require("./modules/me/resolver");
const registerResolver_1 = require("./modules/user/registerResolver");
const isAuthenticated_1 = require("./utils/isAuthenticated");
const resolver_2 = require("./modules/task/resolver");
const User_1 = require("./entity/User");
const jsonwebtoken_1 = require("jsonwebtoken");
const generateToken_1 = require("./modules/user/generateToken");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const path = '/graphql';
    yield createTypeormConnection_1.createTypeormConnection();
    const app = express_1.default();
    app.use(cookie_parser_1.default());
    app.use(cors_1.default({ origin: '*', credentials: true }));
    app.post('/refresh_token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.jid;
        if (!token) {
            return res.send({ ok: false, accessToken: '' });
        }
        let payload = null;
        try {
            payload = jsonwebtoken_1.verify(token, 'myawesomesecretadkjsahdjk');
        }
        catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: '' });
        }
        const user = yield User_1.User.findOne({ id: payload.userId });
        if (!user) {
            return res.send({ ok: false, accessToken: '' });
        }
        res.cookie('jid', generateToken_1.generateRefreshToken(user.id), {
            httpOnly: true,
            path: '/refresh_token',
        });
        return res.send({ ok: true, accessToken: generateToken_1.generateAccessToken(user.id) });
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [resolver_1.helloResolver, registerResolver_1.registerResolver, resolver_2.taskResolver],
            authChecker: isAuthenticated_1.isAuthenticated,
        }),
        context: ({ req, res }) => ({
            req,
            res,
        }),
        introspection: true,
        playground: true,
    });
    apolloServer.applyMiddleware({
        path,
        app,
        cors: false,
    });
    app.listen(process.env.PORT || 4000, () => {
        console.log('timeXoneSyncer running on port 4000 !!');
    });
});
main();
//# sourceMappingURL=index.js.map