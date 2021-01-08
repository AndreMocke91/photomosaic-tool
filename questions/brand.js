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
    name: "logoURL",
    message: "Provide a link to the client's postimage logo, ex https://postimg.cc/c6dMGV5Q",
    validate: validateURL
  },
  {
    type: "text",
    name: "mainImageURL",
    message: "Provide a link to main image, for Twitter purposes, ex https://i.postimg.cc/mkpn1j2d/3370-Jungle-World-Heart-Day-reveal-post-800x418px-REV-4.jpg",
    validate: validateURL
  },
  {
    type: "text",
    name: "brandColor",
    message: "Provide the brand's color code, ex #47AF5B",
    validate: validateStringLength(4)
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

