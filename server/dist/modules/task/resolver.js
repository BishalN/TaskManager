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
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Task_1 = require("../../entity/Task");
const isAuth_1 = require("../../utils/isAuth");
const isUsersTask_1 = require("./isUsersTask");
let taskResolver = class taskResolver {
    createTask({ payload }, title, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = Task_1.Task.create({
                title,
                status,
                user: payload.userId,
            });
            yield task.save();
            return task;
        });
    }
    getAllMyTasks({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = payload.userId;
            const myTasks = yield Task_1.Task.find({ where: { user: id } });
            return myTasks;
        });
    }
    deleteTask({ payload }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = payload.userId;
            const { message, result } = yield isUsersTask_1.isUsersTask(id, userId);
            if (!result)
                throw new Error(message);
            yield Task_1.Task.delete(id);
            return true;
        });
    }
    updateTask({ payload }, id, title, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = payload.userId;
            const { message, result } = yield isUsersTask_1.isUsersTask(id, userId);
            if (!result)
                throw new Error(message);
            const updatedTask = yield typeorm_1.getConnection()
                .getRepository(Task_1.Task)
                .createQueryBuilder("task")
                .update(Task_1.Task, { title, status })
                .where("task.id =:id", { id })
                .returning("*")
                .updateEntity(true)
                .execute();
            const taskResult = Object.assign(Object.assign({}, updatedTask.raw[0]), { user: updatedTask.raw[0].userId });
            return taskResult;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Task_1.Task),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("title")),
    __param(2, type_graphql_1.Arg("status", { defaultValue: "active" })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], taskResolver.prototype, "createTask", null);
__decorate([
    type_graphql_1.Query(() => [Task_1.Task]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], taskResolver.prototype, "getAllMyTasks", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], taskResolver.prototype, "deleteTask", null);
__decorate([
    type_graphql_1.Mutation(() => Task_1.Task),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id")),
    __param(2, type_graphql_1.Arg("title", { nullable: true })),
    __param(3, type_graphql_1.Arg("status", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], taskResolver.prototype, "updateTask", null);
taskResolver = __decorate([
    type_graphql_1.Resolver()
], taskResolver);
exports.taskResolver = taskResolver;
//# sourceMappingURL=resolver.js.map