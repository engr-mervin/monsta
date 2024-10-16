import { createMondayClient } from "./createMondayClient.js";

const m1 = createMondayClient({
  name: "test",
  apiToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI5NTgxMzQ5MywiYWFpIjoxMSwidWlkIjo1MDQ2MTIxNCwiaWFkIjoiMjAyMy0xMS0xM1QxMzoxNTowNy4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6OTExNTEwMSwicmduIjoidXNlMSJ9.uRv_szENt79ENltg_SEDWPvWdG31o_fBT-TKVeUcRkQ",
  version: "2024-10",
});

(async function () {
  const groups = await m1.getGroupsByBoard(7339350165);
  console.log(JSON.stringify(groups));

  const rows = await m1.getRowsByGroup(groups[0]);
  console.log(JSON.stringify(rows[0].cells["status_17__1"], null, 2));
})();
