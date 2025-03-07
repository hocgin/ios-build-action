const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
    try {
        if (
            core.getInput("browserstack-upload").toLowerCase() === "true" &&
            (!core.getInput("browserstack-username") || !core.getInput("browserstack-access-key"))
        ) {
            throw new Error("Browserstack username or access key missing.");
        }
        process.env.APPSTORE_UPLOAD = core.getInput("appstore-upload");

        process.env.TESTFLIGHT_UPLOAD = core.getInput("upload-to-testflight");

        // 蒲公英
        process.env.PGY_UPLOAD = core.getInput("pgy-upload");
        process.env.PGY_API_KEY = core.getInput("pgy-api-key");
        let pgypassword = core.getInput("pgy-password");
        process.env.PGY_PASSWORD = pgypassword;
        /// 如果有设置密码则为密码安装
        process.env.PGY_INSTALL_TYPE = `${pgypassword}`.trim()?.length > 0 ? '2' : '1';

        //
        process.env.BROWSERSTACK_UPLOAD = core.getInput("browserstack-upload");
        process.env.BROWSERSTACK_USERNAME = core.getInput("browserstack-username");
        process.env.BROWSERSTACK_ACCESS_KEY = core.getInput("browserstack-access-key");

        process.env.INCREMENT_BUILD_NUMBER = core.getInput("increment-build-number");
        process.env.PROJECT_PATH = core.getInput("project-path");
        process.env.TEAM_ID = core.getInput("team-id");
        process.env.TEAM_NAME = core.getInput("team-name");
        process.env.WORKSPACE_PATH = core.getInput("workspace-path");

        process.env.EXPORT_METHOD = core.getInput("export-method");
        process.env.MATCH_BUILD_TYPE = core.getInput("match-build-type");
        process.env.PROVISIONING_PROFILE = core.getInput("provisioning-profile");
        process.env.CODE_SIGN_IDENTITY = core.getInput("code-sign-identity");
        process.env.HAS_PACKAGES_CACHE_HIT = core.getInput("has-packages-cache-hit");
        process.env.PACKAGES_CACHE_PATH = core.getInput("packages-cache-path");

        process.env.CONFIGURATION = core.getInput("configuration");
        process.env.OUTPUT_PATH = core.getInput("output-path");
        process.env.SCHEME = core.getInput("scheme");
        process.env.BUILD_PODS = core.getInput("build-pods");
        process.env.PODS_PATH = core.getInput("pods-path");
        process.env.MATCH_PASSWORD = core.getInput("match-password");
        process.env.MATCH_GIT_URL = core.getInput("match-git-url");
        process.env.MATCH_GIT_BASIC_AUTHORIZATION = core.getInput("match-git-basic-authorization");
        process.env.APPLE_KEY_ID = core.getInput("apple-key-id");
        process.env.APPLE_KEY_ISSUER_ID = core.getInput("apple-key-issuer-id");
        process.env.APPLE_KEY_CONTENT = core.getInput("apple-key-content");
        process.env.FASTLANE_VERSION = core.getInput("fastlane-version");
        process.env.FASTLANE_ENV = core.getInput("fastlane-env");
        process.env.IOS_APP_ID = core.getInput("ios-app-id");

        await exec.exec(`bash ${__dirname}/../build.sh`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
