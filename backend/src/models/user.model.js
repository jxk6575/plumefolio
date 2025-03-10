module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin'],
      defaultValue: 'user'
    },
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'inactive', 'banned'],
      defaultValue: 'active'
    }
  }, {
    timestamps: true,
    paranoid: true, // 软删除
    tableName: 'users'
  });

  User.associate = (models) => {
    // 一个用户可以上传多张照片
    User.hasMany(models.Photo, {
      foreignKey: 'userId',
      as: 'photos'
    });
  };

  return User;
}; 