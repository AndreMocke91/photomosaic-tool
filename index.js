const { createProject } = require("./firebase/create-project");
const { brandQuestions } = require("./questions/brand");
const { saveCampaignJSON, compilePublicFiles } = require("./shared/files");
const { spawnCommand } = require("./shared/utils");

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

  const result = await spawnCommand("npx", ["firebase", "deploy", "--project", brand.projectId]);

  console.log(result)
  console.log('All done, yay')
};

(async () => {
  await startCLI();
  // const result = await createProject('andre-mosaic-tool-test-work')
})();
