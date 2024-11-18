import { MemberApiRepository } from "./api/member.repository";
import { MemberRepository } from "./member.repository.interface";

export type Depencencies = {
  memberRepository: MemberRepository;
};

export const dependencies: Depencencies = {
  memberRepository: MemberApiRepository, // MemberMockRepository
};
