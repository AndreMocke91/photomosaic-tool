const { requireAuth } = require("firebase-tools/lib/requireAuth");
const deploy = require("firebase-tools/lib/deploy");
// const deploy

const config = {
  get: () => {
    return {
      public: "public",
      ignore: ["firebase.json", "**/.*", "**/node_modules/**"],
      rewrites: [
        {
          source: "**",
          destination: "/index.html",
        },
      ],
    };
  }
};

const deployProject = async (projectId, pathToFolder = '/Users/andremocke/Documents/Github/Bluerobot/photomosaic-tool/public') => {
  console.log("Deploying firebase project");

  config.path = () => pathToFolder

  try {
    requireAuth({});
    await deploy(["hosting"], { project: projectId, site: projectId, config });
    console.log("Deployment complete for :", projectId);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  deployProject,
};
