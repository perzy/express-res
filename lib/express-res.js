'use strict';

/**
 * Created by Jerry Wu on 7/9/15.
 */

/**
 * Module dependencies
 */
var glob = require('glob'),
  _ = require('lodash'),
  debug = require('debug')('express:res'),
  async = require('async'),
  path = require('path');


module.exports = function expressRes(options) {

  var defaultOpts = {
    pattern: 'app/responses/*.js',
    realpath: true
  };
  options = _.extend(defaultOpts, options);
  var pattern = options.pattern;
  delete options.pattern;

  return function response(req, res, next) {
    async.waterfall([
      function (callback) {
        glob(pattern, options, callback);
      },
      function (files, callback) {
        _.each(files, function (file) {
          var basename = path.basename(file, '.js');
          debug('basename:' + basename);
          // todo: custom name within file.
          res[basename] = _.bind(require(file), {
            req: req,
            res: res
          });
        });

        callback(null);
      }
    ], function (err, results) {
      if (err) {
        debug(err);
      }

      next();
    });
  };
};