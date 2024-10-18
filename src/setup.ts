import { MondayClient } from "./classes/MondayClient.js";
import type { ClientOptions } from "./types/types.js";

const clients: Map<string, MondayClient> = new Map();

export function createMondayClient(options: ClientOptions): MondayClient {
  if (clients.get(options.name)) {
    throw new Error(`Monday client with name: ${options.name} already exists.`);
  }

  const instance = new MondayClient(options);

  clients.set(options.name, instance);

  return instance;
}

export function getClient(name: string): MondayClient {
  if (clients.has(name)) {
    const instance = clients.get(name);
    if (instance) return instance;
  }
  throw new Error(`Monday client with name: ${name} does not exist.`);
}

export function deleteClient(name: string): boolean {
  return clients.delete(name);
}

export function deleteAllClients(): void {
  return clients.clear();
}
