require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/f05bbeb7f5b747cf9ff3a9434b8f9a87",
      accounts: [
        "0x77a9d0065229ab2968b2b0f6c8719556a1235d4237a8f6e6e8a26615180c2669",
      ],
    },
  },
};
