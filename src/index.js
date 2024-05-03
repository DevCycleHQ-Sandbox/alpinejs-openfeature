import DevCycleProvider from "@devcycle/openfeature-web-provider";
import { OpenFeature } from "@openfeature/web-sdk";

export default function (Alpine) {
  Alpine.store("openfeature", {
    client: null,
  });

  Alpine.directive(
    "openfeature",
    (
      el,
      { value, modifiers, expression },
      { Alpine, effect, evaluate, cleanup }
    ) => {
      setUpOpenFeature().then(() => {
        Alpine.store("openfeature", {
          client: openFeatureClient,
        });
      });

      async function setUpOpenFeature() {
        const user = {
          user_id: "user_id",
          customData: {
            browser: navigator.userAgentData?.brands?.[0]?.brand ?? "Unknown",
            language: navigator.language ?? "Unknown",
            os: navigator.userAgentData?.platform ?? "Unknown",
            mobile: navigator.userAgentData?.mobile ?? false,
          },
        };

        const devcycleProvider = new DevCycleProvider(`${expression}`);

        await OpenFeature.setContext(user);
        await OpenFeature.setProviderAndWait(devcycleProvider);

        openFeatureClient = OpenFeature.getClient();
      }
    }
  );

  Alpine.magic("booleanFlag", (el, { Alpine }) => {
    return (subject, defaultValue = false) => {
      let localStorageValue = defaultValue; // Default to the passed defaultValue

      try {
        // Parse the stored JSON from localStorage
        const storedConfig = JSON.parse(
          localStorage.getItem("dvc:identified_config")
        );

        // Safely access the value for the given subject
        if (
          storedConfig &&
          storedConfig.variables &&
          storedConfig.variables[subject] &&
          storedConfig.variables[subject].type === "Boolean"
        ) {
          localStorageValue = storedConfig.variables[subject].value;
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
      return Alpine.store("openfeature").client
        ? Alpine.store("openfeature").client.getBooleanValue(
            subject,
            defaultValue
          )
        : localStorageValue;
    };
  });

  Alpine.magic("stringFlag", (el, { Alpine }) => {
    return (subject, defaultValue) => {
      let localStorageValue = defaultValue; // Default to the passed defaultValue

      try {
        // Parse the stored JSON from localStorage
        const storedConfig = JSON.parse(
          localStorage.getItem("dvc:identified_config")
        );

        // Safely access the value for the given subject
        if (
          storedConfig &&
          storedConfig.variables &&
          storedConfig.variables[subject] &&
          storedConfig.variables[subject].type === "String"
        ) {
          localStorageValue = storedConfig.variables[subject].value;
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }

      return Alpine.store("openfeature").client
        ? Alpine.store("openfeature").client.getStringValue(
            subject,
            defaultValue
          )
        : localStorageValue;
    };
  });
}
