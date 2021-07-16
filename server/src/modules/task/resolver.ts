import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Task } from '../../entity/Task';
import { MyContext } from '../../types/MyContext';
import { currentlyLoggedInUserId } from '../../utils/currentlyLoggedUserId';
import { isUsersTask } from './isUsersTask';

@Resolver()
export class taskResolver {
  @Authorized()
  @Mutation(() => Task)
  async createTask(
    @Ctx() { req }: MyContext,
    @Arg('title') title: string,
    @Arg('status', { defaultValue: 'active' })
    status: 'active' | 'completed' | 'archived'
  ): Promise<Task> {
    const task = Task.create({
      title,
      status,
      user: currentlyLoggedInUserId(req),
    });
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
  @Mutation(() => Boolean)
  async deleteTask(@Ctx() { req }: MyContext, @Arg('id') id: string) {
    const { message, result } = await isUsersTask(
      id,
      currentlyLoggedInUserId(req)
    );
    if (!result) throw new Error(message);
    await Task.delete(id);

    return true;
  }

  @Authorized()
  @Mutation(() => Task)
  async updateTask(
    @Ctx() { req }: MyContext,
    @Arg('id') id: string,
    @Arg('title', { nullable: true }) title: string,
    @Arg('status', { nullable: true }) status: string
  ) {
    const { message, result } = await isUsersTask(
      id,
      currentlyLoggedInUserId(req)
    );
    if (!result) throw new Error(message);
    const updatedTask = await getConnection()
      .getRepository(Task)
      .createQueryBuilder('task')
      .update<Task>(Task, { title, status })
      .where('task.id =:id', { id })
      .returning('*')
      .updateEntity(true)
      .execute();
    const taskResult = {
      ...updatedTask.raw[0],
      user: updatedTask.raw[0].userId,
    };
    return taskResult;
  }
}
