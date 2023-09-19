const UserService = require('./user.service');
const { handleError, buildResponse } = require('../../utilities/response');
const crypto = require('../../services/crypto.service');
const jwt = require('../../services/jwt.service');
const { getIsAdmin, getIsSuperadmin } = require('../../utilities/role');

class UserController {
  static async register(req, res) {
    try {
      const { full_name, email, password, role, level, repeat_password } = req.body;

      const user = await UserService.getUserByEmail(email)
      if(user) {
        return res.status(409).json(buildResponse(null, false, "Email already used"));
      }

      if(password != repeat_password) {
        return res.status(409).json(buildResponse(null, false, "Password not match"));
      }

      const hashedPassword = crypto.encrypt(password)
      const newUser = await UserService.createUser(full_name, email, hashedPassword, role, level);
      
      const payloadJwt = {
        id:newUser.user_id,
        name:newUser.full_name,
        email:newUser.email,
        role:newUser.role,
        level:newUser.level
      }

      const token = jwt.generateJwtToken(payloadJwt);
      payloadJwt['token'] = token;

      return res.status(201).json(buildResponse(payloadJwt, true, "Login Success"));

    } catch (error) {
      return handleError(error, req, res)
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await UserService.getUserByEmail(email)
      if (user == null) {
        return res.status(403).json(buildResponse(null, false, "Email not found"));
      }

      const decryptPass = crypto.decrypt(user.password)
      if (decryptPass != password) {
        return res.status(403).json(buildResponse(null, false, "Wrong password"));
      }

      const payloadJwt = {
        id:user.user_id,
        name:user.full_name,
        email:user.email,
        role:user.role,
        level:user.level
      }

      const token = jwt.generateJwtToken(payloadJwt);
      payloadJwt['token'] = token;

      return res.status(201).json(buildResponse(payloadJwt, true, "Login Success"));
    } catch (error) {
      return handleError(error, req, res)
    }
  }

  static async getUsers(req, res, next) {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  static async deleteDuplicateUSer(req, res) {
    try {
      const { secret } = req.params;

      if (secret === "xcvmdel") {
        await UserService.deleteDuplicateUsers();
      }
      return res.status(200).json(buildResponse(null, true, "User deleted successfully"));
    } catch (error) {
      return handleError(error, req, res)
    }
  }

  static async updateUser(req, res) {
    try {
      const user = req.body;
      const {id} = req.params

      if (!getIsAdmin(req.user.role) && !getIsSuperadmin(req.user.role)) {
        return res.status(403).json(buildResponse(null, false, 'Forbiden'));
      }

      const updatedUser = await UserService.updateUser(id, user)
      return res.status(200).json(buildResponse(updatedUser, true, "User updated successfully"));
    
    } catch (error) {
      return handleError(error, req, res)
    }
  }


  // static async getUserById(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const user = await UserService.getUserById(id);
  //     res.json(user);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async createUser(req, res, next) {
  //   try {
  //     const { full_name, email, password, role, level } = req.body;
  //     const newUser = await UserService.createUser(full_name, email, password, role, level);
  //     res.json(newUser);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async deleteUser(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     await UserService.deleteUser(id);
  //     res.sendStatus(204);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = UserController;
