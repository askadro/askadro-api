import { Injectable } from '@nestjs/common';
import { UsersInterface } from '../interfaces/users.interface';
import { GetUserInterface } from '../interfaces/get.user.interface';
import { JobsService } from 'src/jobs/jobs.service';
@Injectable()
export class UserService {
  constructor(private jobsService: JobsService) {} // istediğimiz gibi kullanabilecğeim biz job servisi
  users(): UsersInterface[] {
    const users: UsersInterface[] = [];

    // Generate 100 users
    for (let i = 0; i < 100; i++) {
      users.push({
        id: i + 1, // Start IDs from 1
        first_name: `User${i + 1}`, // Generate generic names
        last_name: `Last${i + 1}`,
      });
    }
    return users;
  }
  getUsers(): UsersInterface[] {
    return this.users();
  }

  getUser(username: string): GetUserInterface {
    return {
      user: username,
    };
  }
  userUpdate(id: number) {
    const users = this.users();
    users[id - 1].first_name = 'Updated';
    return {
      message: `User ${id} updated`,
      users,
    };
  }

  deleteUser(id: number) {
    const users = this.users();
    users.splice(id - 1, 1);
    return {
      message: `User ${id} deleted`,
      users,
    };
  }
}
