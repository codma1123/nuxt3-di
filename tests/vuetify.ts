import { createVuetify } from "vuetify/lib/framework.mjs";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as _ from "vuetify";

export const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VBtn: {
      variant: "text",
      elevation: "0",
    },
    VTextField: {
      variant: "underlined",
    },
    VSelect: {
      variant: "underlined",
    },
  },
});
