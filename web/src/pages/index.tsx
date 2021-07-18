import { useQueryClient } from 'react-query';
import { useRegisterMutation } from '../generated';

function home() {
  const queryClient = useQueryClient();
  const { mutate } = useRegisterMutation({});

  return <div>this is the awesome page</div>;
}

export default home;
