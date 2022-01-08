const deploy = async () => {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with account", deployer.address);

  const AdroPunks = await ethers.getContractFactory("AdroPunks");

  const deployed = await AdroPunks.deploy();

  console.log("AdroPunks has been deployed at:", deployed.address);
};

deploy()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
