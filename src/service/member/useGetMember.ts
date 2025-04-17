import { useSuspenseQuery } from '@tanstack/react-query';
import { MemberQueryOptions } from './queries';

export const useGetMember = (id: string) => {
  return useSuspenseQuery({
    ...MemberQueryOptions.getMember(id),
  });
};
