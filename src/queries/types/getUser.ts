import { BaseResponse, BaseUser } from "../../types/mondayTypes";

export type GET_USER_TYPE = BaseResponse<{
  users: BaseUser[];
}>;


