module.exports = {
  apps: [
    {
      name: "blog-api",
      script: "server.js",
      instances: 2,
      exec_mode: "cluster",
      env: { NODE_ENV: "development", PORT: 3000 },
      env_production: { NODE_ENV: "production", PORT: 3000 },
      // watch: false (tránh watch trên server prod)
    },
  ],
};
