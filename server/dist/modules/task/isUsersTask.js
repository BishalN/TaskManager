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
exports.isUsersTask = void 0;
const typeorm_1 = require("typeorm");
const Task_1 = require("../../entity/Task");
function isUsersTask(taskId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = yield typeorm_1.getConnection()
            .getRepository(Task_1.Task)
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.user', 'user')
            .where('task.id =:id', { id: taskId })
            .getOne();
        if (!task)
            return { result: false, message: 'Task not found' };
        const isUsersTask = task.user.id === userId;
        if (!isUsersTask)
            return { result: false, message: 'unauthorized' };
        return { result: true, message: 'Yes it is' };
    });
}
exports.isUsersTask = isUsersTask;
//# sourceMappingURL=isUsersTask.js.map