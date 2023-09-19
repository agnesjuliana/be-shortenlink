const { where, Op } = require('sequelize');
const User = require('../../DB/models/User');
const sequelize = require('../../DB/config/db-connection'); 

class UserService {
  static async getUsers() {
    return User.findAll();
  }

  static async getUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      console.error('Error checking user existence:', error);
      throw error;
    }
  }

  static async getUserById(id) {
    return User.findByPk(id);
  }

  static async createUser(full_name, email, password, role, level) {
    return User.create({ full_name, email, password, role, level });
  }

  static async updateUser(user_id, dataUser) {
    const user = await User.findByPk(user_id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.update(dataUser);
  }

  static async deleteUser(id) {
    return User.destroy({ where: { user_id: id } });
  }

  static async deleteDuplicateUsers() {
    try {
      // Find duplicate emails and get the highest user_id for each duplicate
      const duplicates = await User.findAll({
        attributes: ['email', [sequelize.fn('MAX', sequelize.col('user_id')), 'max_user_id']],
        group: ['email'],
        having: sequelize.where(sequelize.fn('COUNT', sequelize.col('email')), '>', 1),
      });

      // Get the list of user_ids to keep (highest user_id for each duplicate email)
      const userIdsToKeep = duplicates.map(duplicate => duplicate.dataValues.max_user_id);

      // Delete users with duplicate email and lower user_id
      await User.destroy({
        where: {
          email: {
            [Op.in]: duplicates.map(duplicate => duplicate.dataValues.email),
          },
          user_id: {
            [Op.notIn]: userIdsToKeep,
          },
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserService;
