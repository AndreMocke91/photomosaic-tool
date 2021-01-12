const { createProject } = require("./firebase/create-project");
const { deployProject } = require("./firebase/deploy-project");
const { brandQuestions } = require("./questions/brand");
const { saveCampaignJSON, compilePublicFiles } = require("./shared/files");
require("dotenv-safe").config({});

// const brand = require("./campaigns/andre-test-adding-fb.json")

const onCancel = () => process.exit(0);

const startCLI = async ({ prompts = require("prompts") } = {}) => {
  const brand = await prompts(brandQuestions, { onCancel });

  await saveCampaignJSON(brand);

  await compilePublicFiles(brand);

  const projectExists = await createProject(brand.projectId);

  if (!projectExists) {
    console.log("Something went wrong");
    return;
  }

  const deployWorked = await deployProject(brand.projectId);

  if (deployWorked) console.log(`Check out your brand, spanky new site at: https://${brand.projectId}.web.app/`)
  // console.log("All done, yay");
};

(async () => {
  try {
    await startCLI();
    // await deployProject(brand.projectId);
  } catch (err) {
    console.error(err);
  }
})();
