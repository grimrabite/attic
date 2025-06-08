module.exports = function (eleventyConfig) {
  // Copy assets like images
  eleventyConfig.addPassthroughCopy("src/assets");

  // Collections by folder
  eleventyConfig.addCollection("attic", (collectionApi) =>
    collectionApi.getFilteredByGlob("./src/attic/*.md")
  );
  eleventyConfig.addCollection("scenes", (collectionApi) =>
    collectionApi.getFilteredByGlob("./src/scenes/*.md")
  );
  eleventyConfig.addCollection("sketches", (collectionApi) =>
    collectionApi.getFilteredByGlob("./src/sketches/*.md")
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes", // ← this is correct now
      layouts: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
