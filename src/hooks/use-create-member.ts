import { useMutation } from '@tanstack/react-query';
import { MemberQueryOptions } from '../service/member/queries';
import type { Database } from '@/supabase/database.types';

type Member = Database['public']['Tables']['members']['Row'];

export const useCreateMember = () => {
  return useMutation<Member, Error, { name: string; id: string }>({
    mutationFn: ({ name, id }) => {
      const memberQuery = MemberQueryOptions.createMember(name);
      return memberQuery.mutationFn(id);
    },
  });
};
