const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class userMigration extends Model {
        
        static associate(models) {
            // define association here
            // userMigration.belongsTo(models.user,{foreignKey: 'student_Id', targetKey: 'id' })
            userMigration.hasMany(models.user,{foreignKey: 'migration_Id' })
        }
    }

    userMigration.init(
        {
            uuid: DataTypes.UUID,
            student_first_name:DataTypes.STRING,
            student_last_name:DataTypes.STRING,
            old_course_name: DataTypes.STRING,
            new_course_name: DataTypes.STRING,


        },
        {
            sequelize,
            modelName: 'userMigration',
            underscored: false,
        },
    );
    return userMigration;
};