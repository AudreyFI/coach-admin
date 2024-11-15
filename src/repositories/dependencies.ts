import { MemberRepository } from "./member.repository.interface";
import { MemberMockRepository } from "./mock/member.repository";

export type Depencencies = {
  memberRepository: MemberRepository;
};

export const dependencies: Depencencies = {
  memberRepository: MemberMockRepository,
};
