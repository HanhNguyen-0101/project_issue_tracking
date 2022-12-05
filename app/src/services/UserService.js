import { baseService } from "./baseService";

class User extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  userLoginSr = ({ email, passWord }) => {
    return this.post("Users/signin", { email, passWord });
  };

  findUserByKeyword = (keyword) => {
    return this.get(`Users/getUser?keyword=${keyword}`);
  };

  getAllUser = () => {
    return this.get('Users/getUser');
  };

  editUser = (data) => {
    return this.put('Users/editUser', data);
  };

  deleteUser = (userId) => {
    return this.delete(`Users/deleteUser?id=${userId}`);
  };

  registerUser = (user) => {
    return this.post('Users/signup', user);
  }

}
export const UserService = new User();
