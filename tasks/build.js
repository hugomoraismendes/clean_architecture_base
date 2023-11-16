const { execSync } = require('child_process');

const compile = () => {
  return execSync('tsc');
};

const copyFiles = () => {
  execSync('cp package.json dist/');
  execSync('cp package-lock.json dist/');
};

const installDependencies = () => {
  execSync('npm install --production --prefix dist');
};

const clean = () => {
  execSync('rm -rf dist/infra/config/git-ignored');
};

compile();
copyFiles();
installDependencies();
clean();
