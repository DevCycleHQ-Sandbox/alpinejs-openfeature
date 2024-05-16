import DevCycleProvider from "@devcycle/openfeature-web-provider";
import { OpenFeature } from "@openfeature/web-sdk";

export default function (Alpine) {
  console.warn(
    "This plugin was created for demonstration and testing purposes only. It is not recommended to use this plugin in a production environment."
  );

  Alpine.store("openfeature", {
    client: OpenFeature.getClient(),
    setupComplete: false, // Add a flag to track setup completion
  });

  Alpine.directive(
    "openfeature",
    (
      el,
      { value, modifiers, expression },
      { Alpine, effect, evaluate, cleanup }
    ) => {
      setUpOpenFeature();

      async function setUpOpenFeature() {
        console.log("Setting up OpenFeature with provider:", expression);
        let providerInfo;
        try {
          providerInfo = JSON.parse(expression);
        } catch (e) {
          console.error("Invalid JSON string in expression:", expression);
          return;
        }

        if (value === "devcycle") {
          const user = {
            user_id: "user_id",
            customData: {
              browser: navigator.userAgentData?.brands?.[0]?.brand ?? "Unknown",
              language: navigator.language ?? "Unknown",
              os: navigator.userAgentData?.platform ?? "Unknown",
              mobile: navigator.userAgentData?.mobile ?? false,
            },
          };

          const devcycleProvider = new DevCycleProvider(providerInfo.key);

          await OpenFeature.setContext(user);
          await OpenFeature.setProviderAndWait(devcycleProvider);

          openFeatureClient = OpenFeature.getClient();

          Alpine.store("openfeature", {
            client: openFeatureClient,
            setupComplete: true, // Mark setup as complete
          });
        } else {
          console.log(
            "OpenFeature is not initialized. Please provide a valid provider."
          );
        }
      }
    }
  );

  Alpine.magic("booleanFlag", (el, { Alpine }) => {
    return (subject, defaultValue = false) => {
      return Alpine.store("openfeature").client.getBooleanValue(
        subject,
        defaultValue
      );
    };
  });

  Alpine.magic("stringFlag", (el, { Alpine }) => {
    return (subject, defaultValue) => {
      return Alpine.store("openfeature").client.getStringValue(
        subject,
        defaultValue
      );
    };
  });
}
