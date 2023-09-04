import { beforeEach, describe, test, expect, vitest } from "vitest";

import _index from "src/components/RefreshableSelect.vue";
import { mount, shallowMount } from "@vue/test-utils";
import { VBtn, VCombobox, VIcon } from "vuetify/lib/components/index.mjs";
import { vuetify } from "tests/vuetify";

describe("components - RefreshableSelect", () => {
  let component: ReturnType<typeof mount>;
  beforeEach(() => {
    if (component) component.unmount();

    vitest.unstubAllGlobals();

    component = mount(_index, {
      global: {
        plugins: [vuetify],
      },
      props: {
        contents: ["이준하 컴퍼니", "박소민 컴퍼니", "백세종 컴퍼니"],
        modelValue: "이준하 컴퍼니",
        label: "업체 목록",
        loading: false,
      },

      components: {
        VBtn,
        VCombobox,
        VIcon,
      },
    });
  });

  test("마운트", () => {
    expect(_index).toBeTruthy();
    expect(component).toBeDefined;
  });

  test("목록을 펼친다.", async () => {
    console.log(component.html());
    await component.find(".v-input").trigger("click");
    console.log(`\n\n\n`, component.html());
  });
});
