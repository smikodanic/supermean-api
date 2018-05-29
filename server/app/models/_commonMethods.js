/**
 * Methods common for all models.
 */
module.exports = function (modelCommon) {
    'use strict';

    //add new doc
    const add = function (doc) {
        return modelCommon.createAsync(doc);
    };

    //save() method or Bluebird's saveAsync()
    const save = function (docObj) {
        const doc = new modelCommon(docObj);
        return doc.saveAsync();
    };


    //count and list docs for 'moQuery'
    const list = function (moQuery, limit, skip, sort) {
        return modelCommon
            .countAsync(moQuery)
            .then(function (resultsNum) {
                return modelCommon
                    .find(moQuery)
                    .limit(limit)
                    .skip(skip)
                    .sort(sort)
                    .execAsync()
                    .then(function (resultsArr) {
                        const results = {
                            success: true,
                            count: resultsNum,
                            data: resultsArr
                        };
                        return results;
                    });
            });
    };


    //delete one doc
    const deleteOne = function (moQuery) {
        return modelCommon.findOneAndRemoveAsync(moQuery);
    };


    //get doc
    const getOne = function (moQuery, sort) {
        return modelCommon
            .findOne(moQuery)
            .sort(sort)
            .execAsync();
    };


    //update a doc
    const editOne = function (moQuery, docNew, updOpts) {
        return modelCommon.findOneAndUpdateAsync(moQuery, docNew, updOpts);
    };


    return {
        add: add,
        save: save,
        list: list,
        deleteOne: deleteOne,
        getOne: getOne,
        editOne: editOne
    };

};
