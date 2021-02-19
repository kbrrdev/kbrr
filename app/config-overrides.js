const path = require("path");
const { addWebpackAlias, override } = require("customize-cra");

// Add just the necessary icons to decrease bundle size
function overrides(config, env) {
    config.resolve.alias["@ant-design/icons/lib/dist$"] = path.join(
        __dirname,
        "src/icons.js"
    );

    return config;
}

module.exports = override(
    overrides,
    addWebpackAlias({
        "@src": path.join(__dirname, "src"),
        "@assets": path.join(__dirname, "src/assets"),
        "@constants": path.join(__dirname, "src/constants"),
        "@components": path.join(__dirname, "src/components"),
        "@factories": path.join(__dirname, "src/factories"),
        "@views": path.join(__dirname, "src/views"),
        "@reducers": path.join(__dirname, "src/reducers"),
        "@actions": path.join(__dirname, "src/actions"),
        "@helpers": path.join(__dirname, "src/helpers"),
        "@layouts": path.join(__dirname, "src/components/Layouts"),
    })
);
