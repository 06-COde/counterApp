import cluster from "cluster";
import os from "os";

export default function clusterManager(startWorker) {
  const numCPUs = os.cpus().length;

  if (cluster.isPrimary) {
    console.log(`[${new Date().toISOString()}] Primary ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    // Restart workers if any die
    cluster.on("exit", (worker, code, signal) => {
      console.log(`[${new Date().toISOString()}] Worker ${worker.process.pid} died`);
      cluster.fork();
    });

    return true; 
  }

  startWorker(); 
  return false;
}
