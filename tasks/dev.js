const childProcess = require('child_process');
const fs = require('fs');

let nodeApp;

process.on('SIGINT', () => {
  nodeApp.kill('SIGINT');
});

const startNodeServer = () => {
  if (!fs.existsSync('dist/app.js')) {
    return;
  }

  if (nodeApp) {
    nodeApp.kill('SIGINT');
  }

  let params = ['dist/app.js'];

  if (process.env.DEBUG) {
    params.unshift('--inspect=0.0.0.0:9229');
  }

  nodeApp = childProcess.spawn('node', params, {
    env: Object.assign(
      {
        HTTP_PORT: 3000
      },
      process.env
    )
  });

  nodeApp.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  nodeApp.stderr.on('data', (data) => {
    console.error(data.toString());
  });
};

const tsWatch = (done) => {
  const ts = childProcess.spawn('tsc', ['-w', '--skipLibCheck']);

  ts.stdout.on('data', (data) => {
    console.log(data.toString());
    if (data.toString().includes('Found')) {
      startNodeServer();
    }
  });

  process.on('SIGINT', () => {
    done();
  });
};


tsWatch();
