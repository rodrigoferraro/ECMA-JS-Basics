class NPromise {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new Error("Executor deve ser uma função");
    }

    this.state = "pending";
    this.value = "undefined";
    this.onFulfillChain = [];
    this.onRejectCallChain = [];
  }
}

module.exports = NPromise;
