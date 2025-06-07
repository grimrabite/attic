module.exports = function(eleventyConfig) {
  // Bulletproof tag filter: only strings, skip "all", "nav", "post"
  eleventyConfig.addFilter("getAllTags", function(collection) {
    const tagSet = new Set();
    collection.getAll().forEach(item => {
      let tags = item.data.tags;
      if (Array.isArray(tags)) {
        tags.forEach(tag => {
          if (typeof tag === "string" && !["all", "nav", "post"].includes(tag)) {
            tagSet.add(tag);
          }
        });
      } else if (typeof tags === "string") {
        if (!["all", "nav", "post"].includes(tags)) {
          tagSet.add(tags);
        }
      }
      // Ignore other types (numbers, objects, null, etc)
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

  // Copy everything in /src/assets/ to /assets/ in the output
  eleventyConfig.addPassthroughCopy("src/assets");

  // Custom collections for your main sections
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
