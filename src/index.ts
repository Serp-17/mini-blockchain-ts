import * as CryptoJS from "crypto-js";

class Block {
    public id: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    static calculateBlockHash = (
        id: number,
        previousHash: string,
        data: string,
        timestamp: number
    ): string => CryptoJS.SHA256(id + previousHash + data + timestamp).toString();

    static validateBlock = (aBlock: Block): boolean =>
        typeof aBlock.id === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.data === "string" &&
        typeof aBlock.timestamp === "number";

    constructor(
        id: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number,
    ) {
        this.id = id;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0, "21313123", "", "asdad", 123);

let blockchain: [Block] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLastBlockchain = (): Block => blockchain[blockchain.length - 1];

const getTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string) => {
    const lastBlock: Block = getLastBlockchain();
    const newId: number = lastBlock.id + 1;
    const newTimestamp: number = getTimestamp();
    const newHash: string = Block.calculateBlockHash(
        newId,
        lastBlock.hash, 
        data,
        newTimestamp
    );
    const newBlock: Block = new Block(newId, newHash, lastBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};

const getHashforBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.id, aBlock.previousHash, aBlock.data, aBlock.timestamp);

const isValidBlock = (block: Block, lastBlock: Block): boolean => {
    if (!Block.validateBlock(block)) {
        return false;
    } else if (lastBlock.id + 1 !== block.id) {
        return false;
    } else if (lastBlock.hash !== block.previousHash) {
        return false;
    } else if (getHashforBlock(block) !== block.hash) {
        return false;
    }
    return true;
}

const addBlock = (block: Block): void => {
    if (isValidBlock(block, getLastBlockchain())) {
        blockchain.push(block);
    }
};

createNewBlock("22Ghbdtn")
createNewBlock("22Gshbdtn")
createNewBlock("22Ghbdtn")
createNewBlock("22Gshbdtn")
createNewBlock("22sGhbdtn")
createNewBlock("22Gshbdtn")
console.log(getBlockchain());
