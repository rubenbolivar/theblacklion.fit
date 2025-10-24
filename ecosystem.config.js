module.exports = {
  apps: [{
    name: 'black-lion-empire',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3002',
    env: {
      NODE_ENV: 'production',
      PORT: 3002
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}