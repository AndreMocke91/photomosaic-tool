const { spawnCommand } = require("../shared/utils");

const createProject = async (projectId) => {
  console.log("Creating firebase project");

  const result = await spawnCommand("npx", ["firebase", "projects:create", projectId]);

  if (result.indexOf("Failed to create project because there is already a project with ID") > -1) {
    console.log("Project already exists");
    return true;
  }
  if (result.indexOf("https://console.firebase.google.com/project/") > -1) {
    console.log("Project created:", projectId);
    return true;
  }

  console.log(result);

  return false;
};

module.exports = {
  createProject,
};
