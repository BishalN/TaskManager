import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "../../entity/Task";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class taskResolver {
  @Authorized()
  @Query(() => User)
  async ajay(@Ctx() { req }: MyContext) {
    const user = await User.findOne((req.user as any).id);
    return user;
  }

  @Authorized()
  @Mutation(() => Task)
  async createTask(
    @Ctx() { req }: MyContext,
    @Arg("title") title: string,
    @Arg("status", { defaultValue: "active" })
    status: "active" | "completed" | "archived"
  ): Promise<Task> {
    const task = Task.create({ title, status, user: (req.user as any).id });
    await task.save();
    return task;
  }

  @Authorized()
  @Query(() => [Task])
  async getAllMyTasks(@Ctx() { req }: MyContext) {
    const user = (req.user as any).id;
    const myTasks = await Task.find({ where: { user } });
    return myTasks;
  }

  @Authorized()
  @Mutation(() => Task)
  async deleteTask(@Ctx() { req }: MyContext, @Arg("id") id: string) {
    const task = await Task.findOne(id);
    if (!task) throw new Error("Task not found");

    const isUsersTask = task.user === (req.user as any).id;
    if (!isUsersTask) throw new Error("Unauthorized");

    return Task.remove(task);
  }

  @Authorized()
  @Mutation(() => Task)
  async updateTask(
    @Ctx() { req }: MyContext,
    @Arg("title") title: string,
    @Arg("status") status: string
  ) {}
}

// we need the createTask,updateTask and delete task mutation along with a getall task for a particular user
