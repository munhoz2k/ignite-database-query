import { getRepository, JoinTable, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    const user = await this.repository.findOne(user_id, { relations: ["games"]})

    return user
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const asdai = await this.repository.query('SELECT * FROM users ORDER BY first_name'); // Complete usando raw query
    return asdai
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const full_name = first_name + ' ' + last_name
    return await this.repository.query(`SELECT email, first_name, last_name FROM users WHERE LOWER(CONCAT_WS(' ', first_name, last_name)) = LOWER($1)`, [`${full_name}`])
  }
}
