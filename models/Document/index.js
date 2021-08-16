const Sequelize = require('sequelize');
const db = require('../../config/db')
const logger = require('../../config/logger').documentModelLogger

const Document = db.define('Document', {
    fileName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {

        }
    },
    fileUri: {
        type: Sequelize.STRING,
        // allowNull: false,
        validate: {

        }
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