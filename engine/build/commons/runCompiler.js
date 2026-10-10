module.exports = (compiler) => new Promise((resolve, reject) => {
  compiler.run((error, stats) => {
    const failure = error || (stats?.hasErrors() ? new Error(stats.toString({ all: false, errors: true, warnings: true, colors: true })) : null);
    compiler.close((closeError) => {
      if (failure || closeError) reject(failure || closeError);
      else resolve(stats);
    });
  });
});
