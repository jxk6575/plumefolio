module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '分类层级: 1=科, 2=属, 3=种'
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'inactive'],
      defaultValue: 'active'
    }
  }, {
    timestamps: true,
    tableName: 'categories'
  });

  Category.associate = (models) => {
    // 一个类别可以包含多张照片
    Category.hasMany(models.Photo, {
      foreignKey: 'categoryId',
      as: 'photos'
    });

    // 类别可以有子类别 (自引用关系)
    Category.hasMany(Category, {
      foreignKey: 'parent_id',
      as: 'subcategories'
    });

    Category.belongsTo(Category, {
      foreignKey: 'parent_id',
      as: 'parent'
    });
  };

  return Category;
}; 