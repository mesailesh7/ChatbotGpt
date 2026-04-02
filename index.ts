import concurrently from "concurrently";

// to start both application at once
concurrently([
  {
    name: "server",
    command: "bun run dev",
    cwd: "packages/server",
    prefixColor: "cyan",
  },
  {
    name: "client",
    command: "bun run dev",
    cwd: "packages/client",
    prefixColor: "green",
  },
]);
