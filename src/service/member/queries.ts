import { supabase } from '@/lib/supabase';
import MemberService from './service';

export const memberQuerykeys = {
  member: ['member'] as const,
};

export const MemberQueryOptions = {
  getMember: (id: string) => ({
    queryKey: memberQuerykeys.member,
    queryFn: () => {
      return new MemberService(supabase).getMember(id);
    },
  }),
};
