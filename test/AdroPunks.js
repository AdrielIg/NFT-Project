const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Adro Punks Contract", () => {
  const setup = async ({ maxSupply = 10000 }) => {
    const owner = await ethers.getSigner();
    const AdroPunks = await ethers.getContractFactory("AdroPunks");
    const deployed = await AdroPunks.deploy(maxSupply);

    return { owner, deployed };
  };
  describe("Deployment", () => {
    it("should set maxSupply", async () => {
      const maxSupply = 4000;
      const { deployed } = await setup({ maxSupply });

      const returnedMaxSupple = await deployed.maxSupply();

      expect(maxSupply).to.equal(returnedMaxSupple);
    });
  });
  describe("Minting", () => {
    it("should mint a new token and assigns it to owner", async () => {
      const { owner, deployed } = await setup({});
      await deployed.mint();

      const ownerOfminted = await deployed.ownerOf(0);

      expect(ownerOfminted).to.equal(owner.address);
    });
    it("should revert the mint", async () => {
      const maxSupply = 2;
      const { deployed } = await setup({ maxSupply });

      //Mint All
      await Promise.all([deployed.mint(), deployed.mint()]);

      await expect(deployed.mint()).to.be.revertedWith("No AdroPunks left");
    });
  });

  describe("tokenURI", () => {
    it("should returns valid metadata", async () => {
      const { deployed } = await setup({});

      await deployed.mint();

      const tokenURI = await deployed.tokenURI(0);
      const stringifiedTokenURI = await tokenURI.toString();
      const [prefix, base64JSON] = stringifiedTokenURI.split(
        "data:application/json;base64,"
      );
      const stringifiedMetadata = await Buffer.from(
        base64JSON,
        "base64"
      ).toString("ascii");

      const metadata = JSON.parse(stringifiedMetadata);

      expect(metadata).to.have.all.keys("name", "description", "image");
    });
  });
});
