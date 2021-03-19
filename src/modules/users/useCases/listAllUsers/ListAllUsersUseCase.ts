import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);
    const isUserAdmin = user.admin;

    if (!isUserAdmin) {
      throw new Error("User has no permissions");
    }
    const usersList = this.usersRepository.list();

    if (!usersList) {
      throw new Error("Empty list");
    }

    return usersList;
  }
}

export { ListAllUsersUseCase };
