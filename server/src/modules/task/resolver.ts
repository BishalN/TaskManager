import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Task } from "../../entity/Task";
import { MyContext } from "../../types/MyContext";
import { currentlyLoggedInUserId } from "../../utils/currentlyLoggedUserId";
import { isAuth } from "../../utils/isAuth";
import { isUsersTask } from "./isUsersTask";

@Resolver()
export class taskResolver {
  @Mutation(() => Task)
  @UseMiddleware(isAuth)
  async createTask(
    @Ctx() { payload }: MyContext,
    @Arg("title") title: string,
    @Arg("status", { defaultValue: "active" })
    status: "active" | "completed" | "archived"
  ): Promise<Task> {
    const task = Task.create({
      title,
      status,
      user: payload.userId as any,
    });
    await task.save();
    return task;
  }

  @Query(() => [Task])
  @UseMiddleware(isAuth)
  async getAllMyTasks(@Ctx() { payload }: MyContext) {
    const id = payload.userId;
    const myTasks = await Task.find({ where: { user: id } });
    return myTasks;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteTask(@Ctx() { payload }: MyContext, @Arg("id") id: string) {
    const userId = payload.userId;
    const { message, result } = await isUsersTask(id, userId);
    if (!result) throw new Error(message);
    await Task.delete(id);

    return true;
  }

  @Mutation(() => Task)
  @UseMiddleware(isAuth)
  async updateTask(
    @Ctx() { payload }: MyContext,
    @Arg("id") id: string,
    @Arg("title", { nullable: true }) title: string,
    @Arg("status", { nullable: true }) status: string
  ) {
    const userId = payload.userId;
    const { message, result } = await isUsersTask(id, userId);
    if (!result) throw new Error(message);
    const updatedTask = await getConnection()
      .getRepository(Task)
      .createQueryBuilder("task")
      .update<Task>(Task, { title, status })
      .where("task.id =:id", { id })
      .returning("*")
      .updateEntity(true)
      .execute();
    const taskResult = {
      ...updatedTask.raw[0],
      user: updatedTask.raw[0].userId,
    };
    return taskResult;
  }
}
