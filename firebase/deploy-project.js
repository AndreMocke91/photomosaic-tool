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
  },
  path: () => '/Users/andremocke/Documents/Github/Bluerobot/photomosaic-tool/public'
};

const deployProject = async (projectId) => {
  console.log("Deploying firebase project");

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
