const { requireAuth } = require("firebase-tools/lib/requireAuth");
const { createCloudProject, addFirebaseToCloudProject } = require("firebase-tools/lib/management/projects");

const isProjectExistsError = e => e?.original?.status === 409

const createProject = async (projectId) => {
  console.log("Creating firebase project");

  try {
    requireAuth({})
    await createCloudProject(projectId, {});
    await addFirebaseToCloudProject(projectId)
    console.log('Creation complete for :', projectId )
    return true
  } catch (err) {
    if(isProjectExistsError(err)) return true
    console.error(err);
    return false
  }
};

module.exports = {
  createProject,
};
