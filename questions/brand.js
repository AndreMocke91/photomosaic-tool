const { validateStringLength, validateURL, validateUUID } = require("../shared/utils");

module.exports.brandQuestions = [
  {
    type: "text",
    name: "projectId",
    message: "What is the project ID? (This will be both the firebase projectID and the name of the site)",
    validate: validateStringLength(5)
  },
  {
    type: "text",
    name: "websiteURL",
    message: "Provide a link to the client's website url, ex https://bluerobot.com",
    validate: validateURL
  },
  {
    type: "text",
    name: "logoLink",
    message: "Provide a link to the client's postimage logo, ex https://postimg.cc/c6dMGV5Q",
    validate: validateURL
  },
  {
    type: "text",
    name: "hashtag",
    message: "What is the hashtag? ex #yolo",
    validate: validateStringLength(2)
  },
  {
    type: "text",
    name: "handle",
    message: "What is the handle? ex @foxyclive",
    validate: validateStringLength(2)
  },
  {
    type: "text",
    name: "campaignId",
    message: "Finally, please paste the BR MOSAIC CAMPAIGN ID. ex e044e174-a737-11ea-bf11-42010af0048b",
    validate: validateUUID
  },

]

