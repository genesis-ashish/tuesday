plugins {
    distribution
}

dependencies {
    implementation(project(":tuesday-config"))
    implementation(project(":tuesday-dictionary-cache"))
    implementation(project(":tuesday-eventhandler"))
    implementation(project(":tuesday-messages"))
    implementation(project(":tuesday-script-config"))
}

description = "tuesday-distribution"

distributions {
    main {
        contents {
            // Octal conversion for file permissions
            val libPermissions = "600".toInt(8)
            val scriptPermissions = "700".toInt(8)
            into("tuesday/bin") {
                from(configurations.runtimeClasspath)
                exclude("tuesday-config*.jar")
                exclude("tuesday-script-config*.jar")
                exclude("tuesday-distribution*.jar")
                include("tuesday-*.jar")
            }
            into("tuesday/lib") {
                from("${project.rootProject.buildDir}/dependencies")
                duplicatesStrategy = DuplicatesStrategy.EXCLUDE

                exclude("genesis-*.jar")
                exclude("tuesday-*.jar")
                exclude("genesis-*.zip")
                exclude("genesisproduct-*.zip")
                exclude("auth-*.zip")

                fileMode = libPermissions
            }
            into("tuesday/cfg") {
                from("${project.rootProject.projectDir}/tuesday-config/src/main/resources/cfg")
                from(project.layout.buildDirectory.dir("generated/product-details"))
                filter(
                    org.apache.tools.ant.filters.FixCrLfFilter::class,
                    "eol" to org.apache.tools.ant.filters.FixCrLfFilter.CrLf.newInstance("lf")
                )
            }
            into("tuesday/scripts") {
                from("${project.rootProject.projectDir}/tuesday-config/src/main/resources/scripts")
                from("${project.rootProject.projectDir}/tuesday-script-config/src/main/resources/scripts")
                filter(
                    org.apache.tools.ant.filters.FixCrLfFilter::class,
                    "eol" to org.apache.tools.ant.filters.FixCrLfFilter.CrLf.newInstance("lf")
                )
                fileMode = scriptPermissions
            }
            // Removes intermediate folder called with the same name as the zip archive.
            into("/")
        }
    }
}

val distribution by configurations.creating {
    isCanBeConsumed = true
    isCanBeResolved = false
}

// To give custom name to the distribution package
tasks {
    distZip {
        archiveBaseName.set("genesisproduct-tuesday")
        archiveClassifier.set("bin")
        archiveExtension.set("zip")
    }
    copyDependencies {
        enabled = false
    }
}

artifacts {
    val distzip = tasks.distZip.get()
    add("distribution", distzip.archiveFile) {
        builtBy(distzip)
    }
}

publishing {
    publications {
        create<MavenPublication>("tuesdayServerDistribution") {
            artifact(tasks.distZip.get())
        }
    }
}

description = "tuesday-distribution"