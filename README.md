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

```html
<div x-data x-openfeature="[DEVCYCLE_CLIENT_KEY]" x-cloak>
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
