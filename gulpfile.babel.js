// see 'tasks' folder for details

try {
  require('require-dir')('tasks');
} catch (err) {
  /* eslint-disable no-console */
  console.error(err);
  /* eslint-enable no-console */
}
