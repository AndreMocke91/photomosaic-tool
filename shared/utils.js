const fetch = require("node-fetch");
const { exec, spawn } = require("child_process");

const validateStringLength = (length) => (value) => {
  if (!value || value.length < length) {
    return `Please provide a min of ${length} letters`;
  }

  return true;
};

const validateUUID = (value) => {
  if (!new RegExp("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}").test(value)) {
    return "Please provide a valid UUID";
  }

  return true;
};

const validateURL = async (value) => {
  if (!new RegExp("^(https:|http:|www.)S*").test(value)) {
    return "Please provide a valid url";
  }

  return new Promise((resolve) => {
    fetch(value)
      .then((response) => {
        // console.log(response.headers.get('access-control-allow-origin'))
        return resolve(true);
      })
      .catch((e) => {
        resolve(`Could not GET ${value}`);
      });
  });
};

const printSection = (heading) => {
  console.info("\n");
  console.info(heading);
  console.info("=========================================");
};

const printWarning = (warning) => {
  console.warn("\x1b[33m", "WARNING: " + warning);
};

const mergeInitialValues = (questions, campaignJSONSection) => {
  return questions.map((question) => ({
    ...question,
    ...(campaignJSONSection && campaignJSONSection[question.name]
      ? { initial: campaignJSONSection[question.name] }
      : {}),
  }));
};

const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, outstring) => {
      if (error) {
        reject(error);
      }
      resolve(outstring);
    });
  });
};

const spawnCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    const cmd = spawn(command, args);

    let output = "";

    cmd.stdout.on("data", (data) => {
      output = data.toString();
    });

    cmd.stderr.on("data", (data) => {
      output = data.toString();
    });

    cmd.on("error", (error) => {
      reject(`error: ${error.message}`);
    });

    cmd.on("close", (code) => {
      resolve(output);
    });
  });
};

module.exports = {
  validateStringLength,
  validateUUID,
  validateURL,
  printSection,
  printWarning,
  execCommand,
  mergeInitialValues,
  spawnCommand
};
