const {Sequelize,DataTypes} = require('sequelize');
const db = require('../../config/db')
const logger = require('../../config/logger').documentModelLogger

const Document = db.define('Document', {
    fileName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {

        }
    },
    fileData: {
        type: DataTypes.BLOB("long"),
    
    }

},{
    timestamps: true,
    createdAt: 'createdOn',
    updatedAt: 'updatedOn'
  })

try {
    Document.sync()
} catch (error) {
    logger.error(error)
}
module.exports = Document;