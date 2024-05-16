> [!WARNING]
> This plugin was created for demonstration and testing purposes only. It is not recommended to use this plugin in a production environment.

# AlpineJS OpenFeature

Add feature flags to an AlpineJS project using the OpenFeature Standard.

> [!NOTE]
> This plugin is currently limited to only the [DevCycle Provider](https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-openfeature).

## Install

### With a CDN

```html
<script
  defer
  src="https://unpkg.com/alpinejs-openfeature@latest/dist/openfeature.min.js"
></script>

<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### With a Package Manager

```shell
yarn add -D alpinejs-openfeature

npm install -D alpinejs-openfeature
```

```js
import Alpine from "alpinejs";
import openfeature from "alpinejs-openfeature";

import openfeature from "alpinejs-openfeature";
Alpine.plugin(openfeature);

Alpine.start();
```

## Example

### Setup

To use this plugin, first include the x-openfeature directive within your main component element, identify your vendor, and provide your Client Key:

```html
<div
  x-data
  x-openfeature:[VENDOR]='{ "key": "[CLIENT_KEY]", "options": {}}'
></div>
```

Replace `[VENDOR]` with the name of your vendor in all lowercase (e.g. "devcycle") and `[CLIENT_KEY]` with your relevant vendor key (e.g. DevCycle Client Key). This initializes the feature flag provider and allows the use of feature flag checks within your application.

**Using Feature Flags**
Feature flags are utilized via special magic methods `$stringFlag` and `$booleanFlag`. These methods allow you to retrieve and act upon the values of your feature flags dynamically.

- **Boolean Flags**: Use `$booleanFlag('flag_key', default_value)` to evaluate a boolean flag. Here `flag_key` is the identifier for your flag, and `default_value` is the fallback value used if the flag cannot be fetched.
- **String Flags**: Use `$stringFlag('flag_key', 'default_value')` to retrieve the value of a string flag, with similar parameters as above.

```html
<template x-if="$booleanFlag('boolean', false)">
  <div class="p-4 bg-green-200 rounded-lg text-green-800">
    <p>The 'Boolean' feature flag is <strong>enabled</strong>!</p>
  </div>
</template>

<div class="p-4 bg-blue-200 rounded-lg text-blue-800">
  <p>
    The 'String' feature flag says "<span
      class="font-bold"
      x-text="$stringFlag('string', 'default')"
    ></span
    >"
  </p>
</div>

<template x-if="!$booleanFlag('boolean', false)">
  <div class="p-4 bg-red-200 rounded-lg text-red-800">
    <p>The 'Boolean' feature flag is <strong>disabled</strong>.</p>
  </div>
</template>
```

**Handling Disconnections and Defaults**
If there is a disconnection or an issue fetching the feature flags, the plugin automatically falls back to default values defined in your code. This ensures that your application can gracefully handle missing or unavailable feature flag data and continue functioning with predefined behaviors.

**Complete Example**

```html
<div x-data x-openfeature:[VENDOR]='{ "key": "[CLIENT_KEY]", "options": {}}'>
  <div class="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h1 class="text-xl font-semibold text-gray-900">
      AlpineJS OpenFeature Feature Flags Demo App
    </h1>
    <h2>Featuring DevCycle's Web Provider</h2>

    <template x-if="$booleanFlag('boolean', false)">
      <div class="p-4 bg-green-200 rounded-lg text-green-800">
        <p>The 'Boolean' feature flag is <strong>enabled</strong>!</p>
      </div>
    </template>

    <div class="p-4 bg-blue-200 rounded-lg text-blue-800">
      <p>
        The 'String' feature flag says "<span
          class="font-bold"
          x-text="$stringFlag('string', 'default')"
        ></span
        >"
      </p>
    </div>

    <template x-if="!$booleanFlag('boolean', false)">
      <div class="p-4 bg-red-200 rounded-lg text-red-800">
        <p>The 'Boolean' feature flag is <strong>disabled</strong>.</p>
      </div>
    </template>
  </div>
</div>
```

> [!TIP]
> If you are building an AlpineJS plugin, consider using the [AlpineJS Plugin Template created by Mark Mead](https://github.com/markmead/alpinejs-plugin-template) that this repository is based upon.
