/**
 * defaultFolder: This should be the folder to look for
 * if there is no global config defined.
 *
 * optionsName:   This is the name of the element in the global
 * config file.
 *
 * globPattern: This is the files you want
 */
function getConfig(defaultFolder, optionsName) {
  if (!GLOBAL.CanonicalApps) {
    GLOBAL.CanonicalApps = {
      src: 'src',
      dest: 'build'
    };
  }

  var config = {
    src: (defaultFolder && defaultFolder.length > 0) ?
      GLOBAL.CanonicalApps.src + '/' + defaultFolder :
      GLOBAL.CanonicalApps.src,
    dest: (defaultFolder && defaultFolder.length > 0) ?
      GLOBAL.CanonicalApps.dest + '/' + defaultFolder :
      GLOBAL.CanonicalApps.dest
  };

  if (!(
    GLOBAL.CanonicalApps &&
    GLOBAL.CanonicalApps.options &&
    GLOBAL.CanonicalApps.options[optionsName] &&
    GLOBAL.CanonicalApps.options[optionsName].src &&
    GLOBAL.CanonicalApps.options[optionsName].dest)) {
    var chalk = require('chalk');
    console.log('');
    console.log(chalk.dim('No options defined for \'') +
      chalk.cyan(optionsName) + chalk.dim('\'- using defaults.'));
    console.log(chalk.blue('    source: ') + config.src);
    console.log(chalk.blue('    dest  : ') + config.dest);
    console.log('');
  } else {
    config = {
      src: GLOBAL.CanonicalApps.options[optionsName].src,
      dest: GLOBAL.CanonicalApps.options[optionsName].dest
    };
  }

  //if (typeof config.src !== 'string') {
  //  for(var i = 0; i < config.src.length; i++) {
  //    config.src[i] = config.src[i] + globPattern;
  //  }
  //} else {
  //  config.src += globPattern;
  //}

  return config;
}

module.exports = {
  getConfig: getConfig
};
