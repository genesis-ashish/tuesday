dependencies {
    implementation("global.genesis:genesis-messages")
    compileOnly(project(path = ":tuesday-dictionary-cache", configuration = "codeGen"))
}

description = "tuesday-messages"