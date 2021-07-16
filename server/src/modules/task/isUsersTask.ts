import { getConnection } from 'typeorm';
import { Task } from '../../entity/Task';

export async function isUsersTask(taskId: string, userId: string) {
  const task = await getConnection()
    .getRepository(Task)
    .createQueryBuilder('task')
    .leftJoinAndSelect('task.user', 'user')
    .where('task.id =:id', { id: taskId })
    .getOne();

  if (!task) return { result: false, message: 'Task not found' };
  const isUsersTask = task.user.id === userId;
  if (!isUsersTask) return { result: false, message: 'unauthorized' };
  return { result: true, message: 'Yes it is' };
}
