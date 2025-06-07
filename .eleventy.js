module.exports = function(eleventyConfig) {
  // Robust tag getter: always returns array, ignores "all", "nav", "post"
  eleventyConfig.addFilter("getAllTags", function(collection) {
    const tagSet = new Set();
    collection.getAll().forEach(item => {
      let tags = item.data.tags;
      if (typeof tags === "string") tags = [tags];
      if (Array.isArray(tags)) {
        tags
          .filter(tag => !["all", "nav", "post"].includes(tag))
          .forEach(tag => tagSet.add(tag));
      }
    });
    return [...tagSet];
  });

  // Slugify filter for tag URLs
  eleventyConfig.addFilter("slug", function(str) {
    return str
      ? str
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]+/g, "")
      : "";
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
