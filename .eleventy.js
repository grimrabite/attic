module.exports = function(eleventyConfig) {
  // Tag filter: robust, as before
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

  // Slugify filter
  eleventyConfig.addFilter("slug", function(str) {
    return str
      ? str
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]+/g, "")
      : "";
  });

  // Passthrough copy for assets (this is REQUIRED for CSS/images)
  eleventyConfig.addPassthroughCopy("src/assets");

  // Custom collections for major sections
  eleventyConfig.addCollection("attic", collectionApi =>
    collectionApi.getFilteredByGlob("src/attic/*.md")
  );
  eleventyConfig.addCollection("scenes", collectionApi =>
    collectionApi.getFilteredByGlob("src/scenes/*.md")
  );
  eleventyConfig.addCollection("sketches", collectionApi =>
    collectionApi.getFilteredByGlob("src/sketches/*.md")
  );
  eleventyConfig.addCollection("characters", collectionApi =>
    collectionApi.getFilteredByGlob("src/characters/*.md")
  );

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};