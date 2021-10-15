import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useGetUserByIdQuery,
  useUpdateTaskMutation,
} from '../generated/graphql';

const useCrudTasks = () => {
  // APIcall-GET
  const {
    data: tasksData,
    error: tasksError,
    loading: tasksLoading,
  } = useGetTasksQuery({ fetchPolicy: 'cache-and-network' });

  // APIcall-UPDATE
  const [update_task_by_pk] = useUpdateTaskMutation();

  // APIcall-CREATE
  const [insert_tasks_one] = useCreateTaskMutation({
    update(cache, { data: { insert_tasks_one } }) {
      const cacheId = cache.identify(insert_tasks_one);
      cache.modify({
        fields: {
          tasks(existingTasks, { toReference }) {
            return [toReference(cacheId), ...existingTasks];
          },
        },
      });
    },
  });

  // APIcall-DELETE
  const [delete_task_by_pk] = useDeleteTaskMutation({
    update(cache, { data: { delete_tasks_by_pk } }) {
      cache.modify({
        fields: {
          tasks(existingTasks, { readField }) {
            return existingTasks.filter(
              (task) => delete_tasks_by_pk.id !== readField('id', task),
            );
          },
        },
      });
    },
  });

  return {
    tasksData,
    tasksError,
    tasksLoading,
    insert_tasks_one,
    update_task_by_pk,
    delete_task_by_pk,
  };
};

export default useCrudTasks;
