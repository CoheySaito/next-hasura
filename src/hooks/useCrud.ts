import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '../generated/graphql';

const useCrud = () => {
  // APIcall-GET
  const { data, error, loading } = useGetUsersQuery({
    fetchPolicy: 'cache-and-network',
  });

  // APIcall-UPDATE
  const [update_users_by_pk] = useUpdateUserMutation();

  // APIcall-CREATE
  const [insert_users_one] = useCreateUserMutation({
    update(cache, { data: { insert_users_one } }) {
      const cacheId = cache.identify(insert_users_one);
      cache.modify({
        fields: {
          users(existingUsers, { toReference }) {
            return [toReference(cacheId), ...existingUsers];
          },
        },
      });
    },
  });

  // APIcall-DELETE
  const [delete_users_by_pk] = useDeleteUserMutation({
    update(cache, { data: { delete_users_by_pk } }) {
      cache.modify({
        fields: {
          users(existingUsers, { readField }) {
            return existingUsers.filter(
              (user) => delete_users_by_pk.id !== readField('id', user),
            );
          },
        },
      });
    },
  });

  return {
    data,
    error,
    loading,
    update_users_by_pk,
    insert_users_one,
    delete_users_by_pk,
  };
};

export default useCrud;
