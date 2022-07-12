dependencies {
    implementation("global.genesis:genesis-pal-execution")
    compileOnly("global.genesis:genesis-dictionary")
    api("global.genesis:genesis-pal-dataserver")
    api("global.genesis:genesis-pal-requestserver")
    api("global.genesis:genesis-pal-streamer")
    api("global.genesis:genesis-pal-streamerclient")
    api("global.genesis:genesis-pal-eventhandler")
    compileOnly(project(path = ":tuesday-dictionary-cache", configuration = "codeGen"))
    testCompileOnly(project(":tuesday-config"))
    testImplementation("global.genesis:genesis-dbtest")
    testImplementation("global.genesis:genesis-testsupport")
    testImplementation(project(path = ":tuesday-dictionary-cache", configuration = "codeGen"))
}

description = "tuesday-script-config"
