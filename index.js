var _     = require('lodash');
var map   = require('map-stream');
var pp    = require('preprocess');
var path  = require('path');
var util  = require('gulp-util');

module.exports = function (context, options) {
  function ppStream(file, callback) {
    var contents, extension, err;

    // TODO: support streaming files
    if (file.isNull()) return callback(null, file); // pass along
    if (file.isStream()) return callback(new util.PluginError("gulp-preprocess", "Streaming not supported"));

    context.NODE_ENV = context.NODE_ENV || 'development';

    try {
      contents = file.contents.toString('utf8');
      contents = pp.preprocess(contents, context, options);
      file.contents = new Buffer(contents);
    } catch (error) {
      err = new util.PluginError("gulp-preprocess", error);
    }

    if (err == null) {
      callback(null, file);
    } else {
      callback(err);
    }
  }

  return map(ppStream);
};
