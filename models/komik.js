module.exports = (sequelize, DataTypes) => {
    const Komik = sequelize.define('Komik', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        judul: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sinopsis: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        tahun_terbit: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        penulis_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genre_ids: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        }
    }, {
        tableName: 'komik',
        timestamps: false
    });
    Komik.associate = (models) => {
        Komik.belongsTo(models.Penulis, {
            foreignKey: 'penulis_id',
            as: 'penulis'
        });
        Komik.belongsToMany(models.Genre, {
            through: 'komik_genres',
            foreignKey: 'komik_id',
            otherKey: 'genre_id',
            as: 'genre'
        });
    };
    return Komik;
};