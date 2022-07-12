dependencies {
    implementation("global.genesis:genesis-pal-execution")
    implementation("global.genesis:genesis-eventhandler")
    implementation(project(":tuesday-messages"))
    api("global.genesis:genesis-db")
    compileOnly(project(":tuesday-config"))
    compileOnly(project(path = ":tuesday-dictionary-cache", configuration = "codeGen"))
    testImplementation("global.genesis:genesis-dbtest")
    testImplementation("global.genesis:genesis-testsupport")
    testImplementation(project(path = ":tuesday-dictionary-cache", configuration = "codeGen"))
}

description = "tuesday-eventhandler"