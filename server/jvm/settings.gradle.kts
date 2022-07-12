rootProject.name = "genesisproduct-tuesday"

pluginManagement {
    repositories {
        mavenLocal {
            // VERY IMPORTANT!!! EXCLUDE AGRONA AS IT IS A POM DEPENDENCY AND DOES NOT PLAY NICELY WITH MAVEN LOCAL!
            content {
                excludeGroup("org.agrona")
            }
        }
        mavenCentral()
        gradlePluginPortal()
        maven {
            url = uri("https://genesisglobal.jfrog.io/genesisglobal/dev-repo")
            credentials {
                username = extra.properties["genesisArtifactoryUser"].toString()
                password = extra.properties["genesisArtifactoryPassword"].toString()
            }
        }
    }
}



include("tuesday-config")
include("tuesday-messages")
include("tuesday-eventhandler")
include("tuesday-script-config")
include("tuesday-distribution")
include("tuesday-dictionary-cache")
include("tuesday-dictionary-cache:genesis-generated-sysdef")
include("tuesday-dictionary-cache:genesis-generated-fields")
include("tuesday-dictionary-cache:genesis-generated-dao")
include("tuesday-dictionary-cache:genesis-generated-hft")
include("tuesday-dictionary-cache:genesis-generated-view")
include("tuesday-deploy")
include("tuesday-site-specific")
