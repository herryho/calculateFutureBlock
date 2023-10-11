import { ApiPromise, WsProvider } from "@polkadot/api";
import { cryptoWaitReady } from "@polkadot/util-crypto";

async function main() {
  //   const targetTimeString = "2023-10-1 0:00:00";
  //   const targetTimeString = "2023-11-30 20:00:00";
  //   const targetTimeString = "2023-10-24 8:00:00";
  //   const targetTimeString = "2023-10-12 20:00:00";
  //   const targetTimeString = "2023-10-23 20:00:00";
  // Bifrost-kusama
  //   const endPoint = "wss://bifrost-rpc.liebi.com/ws";
  // Bifrost-polkadot
  const endPoint = "wss://hk.p.bifrost-rpc.liebi.com/ws";

  await cryptoWaitReady();

  const wsProvider = new WsProvider(endPoint);
  const api = await ApiPromise.create({ provider: wsProvider });
  await api.isReady;

  // 查询当前链的最新区块高度
  const blockInfo = await api.rpc.chain.getBlock();
  const currentBlock = parseInt(blockInfo.block.header.number);

  // 计算当前时间与目标时间的差距
  const now = new Date();
  const targetTime = new Date(targetTimeString);

  const diff = targetTime.getTime() - now.getTime();

  // 按12秒一个块计算，需要多少个块
  const blockCount = Math.ceil(diff / 12000);

  // 计算目标区块高度
  const targetBlock = currentBlock + blockCount;

  // 获取目标时间的unix时间戳
  const targetUnixTime = Math.floor(targetTime.getTime() / 1000);

  // 打印结果
  console.log(`target block: ${targetBlock}`);
  console.log(`target unix time: ${targetUnixTime}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
