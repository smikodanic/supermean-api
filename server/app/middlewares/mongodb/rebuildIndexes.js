const chalk = require('chalk');
const config = require('server/app/config');

/**
 * Rebuild indexes for one model (collection)
 * @param  {Object} modelName - for example: usersModel
 */
module.exports.oneModel = function (modelName) {
    'use strict';
    modelName.collection.dropIndexesAsync()
        .then(function () {
            return modelName.ensureIndexesAsync()
                .catch(function (err) {
                    throw err;
                });
        })
        .catch(function (err) {
            throw err;
        });
};



/**
 * Rebuild indexes for all models (collections)
 * Activate this with $export NODE_RIND=true
 */
module.exports.allModels = function () {
    'use strict';
    const mongoose = require('mongoose');

    console.log(chalk.blue('NODE_RIND=true - Mongo indexes rebuild for: ', mongoose.modelNames()));

    const modelsArr = mongoose.modelNames();
    /*
    [
        'usersMD',
        'settingsMD',
        'plansMD',
        'dbmoDatabasesMD',
        'dbmoCollectionsMD',
        'dbmoEndpointsMD',
        'dbmoEndpointsAvailableMD',
        'emailServersMD',
        'emailEndpointsAvailableMD',
        'emailEndpointsMD',
        'authGroupsMD',
        'authUsersMD',
        'authEndpointsAvailableMD',
        'authEndpointsMD'
    ]
     */

    modelsArr.forEach(function (mdl) {

        mongoose.model(mdl).collection.dropIndexesAsync()
            .then(function () {
                return mongoose.model(mdl).ensureIndexesAsync()
                    .catch(function (err) {
                        throw err;
                    });
            })
            .catch(function (err) {
                throw err;
            });

    });


};