plugins {
    id("global.genesis.deploy") version "6.0.2"
}

description = "tuesday-deploy"

dependencies {
    implementation(
        group = "global.genesis",
        name = "genesis-distribution",
        version = "6.0.1",
        classifier = "bin",
        ext = "zip"
    )
    implementation(
        group = "global.genesis",
        name = "auth-distribution",
        version = "6.0.1",
        classifier = "bin",
        ext = "zip"
    )

    api(project(":tuesday-distribution", "distribution"))
    api(project(":tuesday-eventhandler"))
    api(project(":tuesday-messages"))
    api(project(":tuesday-site-specific", "distribution"))
    // Add additional dependencies on other external distributions here
}
